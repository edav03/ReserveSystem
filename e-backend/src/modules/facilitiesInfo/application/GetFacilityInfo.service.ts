import { Injectable } from '@nestjs/common';
import { FacilitiesInfoRepository } from '../domain/repository/FacilitiesInfo.repository';

@Injectable()
export class GetFacilityInfoService {
  constructor(
    private readonly facilitiesInfoRepository: FacilitiesInfoRepository,
  ) {}
  public async run(town: string, facility: string) {
    return this.facilitiesInfoRepository.getFacilityInfo(town, facility);
  }
}
