import { Injectable } from '@nestjs/common';
import { newFacilityType } from '../infrastructure/types/Facility';
import { FacilitiesImgRepository } from '../domain/repository/FacilitiesImg.repository';
import { FacilitiesInfoRepository } from '../domain/repository/FacilitiesInfo.repository';
import { Info } from '../domain/entity/info.entity';
import { Img } from '../domain/entity/img.entity';

@Injectable()
export class InsertFacilityService {
  constructor(
    private readonly facilitiesInfoRepository: FacilitiesInfoRepository,
    private readonly facilitiesImgRepository: FacilitiesImgRepository,
  ) {}
  public async run(newFacility: newFacilityType): Promise<boolean> {
    let validFacility = false;
    let cont = 2;
    let newFacilityName = newFacility.facility;
    while (validFacility == false) {
      const facilityExists =
        await this.facilitiesInfoRepository.facilityAlreadyExists(
          newFacility.town,
          newFacilityName,
        );

      facilityExists
        ? ((newFacilityName = `${newFacility.facility}-${cont}`), cont++)
        : ((newFacility.facility = newFacilityName), (validFacility = true));
    }

    const newInfo: Info = {
      id: newFacility.town + newFacility.facility,
      town: newFacility.town,
      facility: newFacility.facility,
      price: newFacility.price,
      location: newFacility.location,
    };
    const newImg: Img = {
      id: newFacility.town + newFacility.facility,
      town: newFacility.town,
      facility: newFacility.facility,
      src: newFacility.image,
    };

    if (
      (await this.facilitiesInfoRepository.insertNewFacility(newInfo)) &&
      (await this.facilitiesImgRepository.insertFacilityImg(newImg))
    ) {
      return true;
    }

    return false;
  }
}
