import 'devextreme/dist/css/dx.darkmoon.compact.css';
import { Scheduler } from 'devextreme-react';
import {
    validateAppointmentData,
    notifySuccess,
    editOptions,
    editOptionsAdmin,
    CustomAppointmentComponent,
    viewsOptions,
    isCellAvailable,
    isValidSelectedDate,
    customizeAppointmentForm,
    notifyWrongData,
} from './scheduler';
import {
    AppointmentAddedEvent,
    AppointmentAddingEvent,
    AppointmentClickEvent,
    AppointmentDeletedEvent,
    AppointmentDeletingEvent,
    AppointmentFormOpeningEvent,
    AppointmentUpdatedEvent,
    AppointmentUpdatingEvent,
} from 'devextreme/ui/scheduler';
import './styles.css';
import notify from 'devextreme/ui/notify';
import { IFetchSchedule, sendFetchAppointment } from '../../hooks/sendFetchAppointment';
import { getLocalTime } from '../../utils/functions';
import { deleteFetchAppointment } from '../../hooks/deleteFetchAppointment';
import { updateFetchAppointment } from '../../hooks/updateFetchAppointment';

export function FacilitySchedule({
    appointments,
    name,
    town,
    price,
    isAdmin,
}: {
    appointments: any;
    name: string;
    town: string;
    price: string;
    isAdmin: boolean;
}) {
    const options = isAdmin ? editOptionsAdmin : editOptions;

    const handleAppointmentFormOpening = (e: AppointmentFormOpeningEvent) => {
        if (!isValidSelectedDate(e) && !isAdmin) {
            notify('No es posible reservar en esta fecha', 'error', 3000);
            e.cancel = true;
        }
        if (!isCellAvailable(e) && !isAdmin) {
            notify('Ya existe una reserva en ese horario', 'warning', 3000);
            e.cancel = true;
        }

        customizeAppointmentForm(e, price);
    };

    async function handleAppointmentAdding(e: AppointmentAddingEvent) {
        const { nombre, dni, email, pago, startDate, endDate } = e.appointmentData;

        if (startDate != undefined && endDate != undefined) {
            const startLocalDate = getLocalTime(startDate);

            const endLocalDate = getLocalTime(endDate);

            if (validateAppointmentData(dni, email)) {
                const objAppointment: IFetchSchedule = {
                    parent_Id: town + name,
                    title: 'RESERVADO',
                    nombre: nombre,
                    dni: dni,
                    email: email,
                    pago: pago,
                    startDate: startLocalDate,
                    endDate: endLocalDate,
                };

                const res = await sendFetchAppointment(objAppointment);

                !res
                    ? (notify('No ha sido posible realizar la reserva', 'error', 3000),
                      (e.cancel = true))
                    : null;
            } else {
                notifyWrongData();
                e.cancel = true;
            }
        }
    }

    function onAppointmentClick(e: AppointmentClickEvent) {
        isAdmin ? null : (e.cancel = true);
    }

    function onAppointmentAdded(e: AppointmentAddedEvent) {
        notifySuccess();
    }

    async function handleAppointmentDeleting(e: AppointmentDeletingEvent) {
        const { nombre, dni, email, pago, startDate, endDate } = e.appointmentData;

        if (startDate != undefined && endDate != undefined) {
            const startLocalDate = getLocalTime(startDate);

            const endLocalDate = getLocalTime(endDate);

            if (validateAppointmentData(dni, email)) {
                const objAppointment: IFetchSchedule = {
                    parent_Id: town + name,
                    title: 'RESERVADO',
                    nombre: nombre,
                    dni: dni,
                    email: email,
                    pago: pago,
                    startDate: startLocalDate,
                    endDate: endLocalDate,
                };

                const res = await deleteFetchAppointment(objAppointment);

                !res
                    ? (notify('No ha sido posible eliminar la reserva', 'error', 3000),
                      (e.cancel = true))
                    : null;
            } else {
                notify('No ha sido posible eliminar la reserva', 'error', 3000);
                e.cancel = true;
            }
        }
        e.cancel = true;
    }

    function onAppointmentDeleted(e: AppointmentDeletedEvent) {
        notify('Reserva eliminada correctamente', 'success', 3000);
    }

    async function handleAppointmentUpdating(e: AppointmentUpdatingEvent) {
        const { nombre, dni, email, pago, startDate, endDate } = e.newData;

        if (startDate != undefined && endDate != undefined) {
            const startLocalDate = getLocalTime(startDate);

            const endLocalDate = getLocalTime(endDate);

            if (validateAppointmentData(dni, email)) {
                const objAppointment: IFetchSchedule = {
                    parent_Id: town + name,
                    title: 'RESERVADO',
                    nombre: nombre,
                    dni: dni,
                    email: email,
                    pago: pago,
                    startDate: startLocalDate,
                    endDate: endLocalDate,
                };

                const res = await updateFetchAppointment(objAppointment);

                !res
                    ? (notify('No ha sido posible editar la reserva', 'error', 3000),
                      (e.cancel = true))
                    : null;
            } else {
                notify('No ha sido posible editar la reserva', 'error', 3000);
                e.cancel = true;
            }
        }
        e.cancel = true;
    }

    function onAppointmentUpdated(e: AppointmentUpdatedEvent) {
        notify('Reserva editada correctamente', 'success', 3000);
    }

    return (
        <Scheduler
            id="scheduler"
            views={viewsOptions}
            dataSource={appointments}
            showAllDayPanel={false}
            defaultCurrentView="workWeek"
            dateSerializationFormat="yyyy-MM-ddTHH:mm:ssZ"
            editing={options}
            startDayHour={8}
            endDayHour={22}
            cellDuration={60}
            appointmentComponent={CustomAppointmentComponent}
            onAppointmentFormOpening={handleAppointmentFormOpening}
            onAppointmentAdding={handleAppointmentAdding}
            onAppointmentAdded={onAppointmentAdded}
            onAppointmentClick={onAppointmentClick}
            onAppointmentDblClick={onAppointmentClick}
            onAppointmentDeleting={handleAppointmentDeleting}
            onAppointmentDeleted={onAppointmentDeleted}
            onAppointmentUpdating={handleAppointmentUpdating}
            onAppointmentUpdated={onAppointmentUpdated}
        />
    );
}
