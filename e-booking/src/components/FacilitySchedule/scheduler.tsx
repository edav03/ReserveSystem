import { AppointmentFormOpeningEvent } from 'devextreme/ui/scheduler';
import { Appointment } from 'devextreme/ui/scheduler';
import validator from 'email-validator';
import { isValidNif } from 'nif-dni-nie-cif-validation';
import notify from 'devextreme/ui/notify';
import {
    getDateToReadableString,
    getHourFromDate,
    transfromToISOString,
} from '../../utils/functions';

export const editOptions = {
    allowAdding: true,
    allowDeleting: false,
    allowResizing: false,
    allowDragging: false,
    allowUpdating: false,
};

export const editOptionsAdmin = {
    allowAdding: true,
    allowDeleting: true,
    allowResizing: false,
    allowDragging: false,
    allowUpdating: true,
};

export const viewsOptions: Array<object> = [
    {
        type: 'day',
        name: 'Dia',
        intervalCount: 2,
        maxAppointmentsPerCell: 1,
    },
    {
        type: 'workWeek',
        name: 'Semana',
        maxAppointmentsPerCell: 1,
    },
    {
        type: 'month',
        name: 'Mes',
        maxAppointmentsPerCell: 1,
    },
];

export const appointmentFields = [
    {
        colSpan: 2,
        label: { text: 'Nombre' },
        editorType: 'dxTextBox',
        dataField: 'nombre',
        validationRules: [{ type: 'required' }],
    },
    {
        colSpan: 2,
        label: { text: 'DNI' },
        editorType: 'dxTextBox',
        dataField: 'dni',
        validationRules: [{ type: 'required' }],
    },
    {
        colSpan: 2,
        label: { text: 'Correo Electronico' },
        editorType: 'dxTextBox',
        dataField: 'email',
        validationRules: [{ type: 'required' }],
    },
    {
        colSpan: 2,
        itemType: 'empty',
    },
    {
        datafield: 'Metodo de Pago',
        editorType: 'dxRadioGroup',
        editorOptions: {
            dataSource: ['Tarjeta', 'Contrareembolso'],
            itemTemplate(itemdata: any) {
                return `${itemdata}`;
            },
        },
        dataField: 'pago',
    },
];

interface data {
    data: {
        targetedAppointmentData: {
            title: string;
            startDate: string;
            endDate: string;
        };
    };
}

export function CustomAppointmentComponent(data: data) {
    const { startDate, endDate } = data.data.targetedAppointmentData;

    const stDate = new Date(startDate);
    const stHour = getHourFromDate(stDate);

    const enDate = new Date(endDate);
    const enHour = getHourFromDate(enDate);

    return (
        <div className="appointments">
            <div className="appointmentTitle">RESERVADO</div>
            <div>
                {stHour} - {enHour}
            </div>
        </div>
    );
}

export function isValidSelectedDate(e: AppointmentFormOpeningEvent) {
    const appDate = new Date(e.appointmentData?.startDate as string);
    const appDatetimestamp = appDate.getTime();
    const currentTime = new Date().getTime();

    return appDatetimestamp < currentTime ? false : true;
}

export function isCellAvailable(e: AppointmentFormOpeningEvent): boolean {
    const currentAppointments = e.component.getDataSource().items();
    let isCellAvailable = true;
    currentAppointments.forEach((appointment: Appointment) => {
        const startDate = new Date(e.appointmentData!.startDate!);
        const appStDate = new Date(appointment.startDate!);

        const isoAppStartDate = transfromToISOString(appStDate);
        const isoStartDate = transfromToISOString(startDate);

        isoAppStartDate === isoStartDate ? (isCellAvailable = false) : null;
    });
    return isCellAvailable;
}

export function customizeAppointmentForm(e: AppointmentFormOpeningEvent, price: string): void {
    e.popup.option('showTitle', true);
    e.popup.option(
        'title',
        getDateToReadableString(
            String(e.appointmentData?.startDate),
            String(e.appointmentData?.endDate)
        )
    );

    const mainGroupItems: any = [
        ...appointmentFields,
        {
            colSpan: 2,
            label: { text: 'Precio' },
            name: 'Precio',
            editorType: 'dxTextBox',
            editorOptions: {
                value: price,
                readOnly: true,
            },
        },
    ];

    e.form.itemOption('mainGroup', 'items', mainGroupItems);
}

export function validateAppointmentData(userDni: string, userEmail: string): boolean {
    return isValidNif(userDni) && validator.validate(userEmail);
}

export function notifyWrongData(): void {
    notify(
        'No se puede crear la reserva porque los datos introducidos no son correctos',
        'warning',
        3000
    );
}

export function notifySuccess(): void {
    notify('La reserva se ha creado correctamente', 'success', 3000);
}
