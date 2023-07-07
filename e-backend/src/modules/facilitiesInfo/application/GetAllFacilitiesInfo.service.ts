import { Injectable } from '@nestjs/common';
import { FacilitiesInfoRepository } from '../domain/repository/FacilitiesInfo.repository';

@Injectable()
export class GetAllFacilitiesInfoService {
  constructor(
    private readonly facilitiesInfoRepository: FacilitiesInfoRepository,
  ) {}
  public async run(town: string) {
    return this.facilitiesInfoRepository.getFacilities(town);
  }
}
