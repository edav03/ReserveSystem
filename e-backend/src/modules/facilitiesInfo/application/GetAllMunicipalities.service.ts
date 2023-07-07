import { Injectable } from '@nestjs/common';
import { FacilitiesInfoRepository } from '../domain/repository/FacilitiesInfo.repository';

@Injectable()
export class GetAllMunicipalitiesService {
  constructor(
    private readonly facilitiesInfoRepository: FacilitiesInfoRepository,
  ) {}
  public async run() {
    const response = await this.facilitiesInfoRepository.getMunicipalities();

    const municipalities = response.map((e: any) => e.town);

    const uniqueMunicipalities = [...new Set(municipalities)];

    return uniqueMunicipalities;
  }
}
