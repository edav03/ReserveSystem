import { Injectable } from '@nestjs/common';
import { FacilitiesImgRepository } from '../domain/repository/FacilitiesImg.repository';

@Injectable()
export class GetFacilityImgService {
  constructor(
    private readonly facilitiesImgRepository: FacilitiesImgRepository,
  ) {}
  public async run(town: string, facility: string) {
    return this.facilitiesImgRepository.getFacilityImg(town, facility);
  }
}
