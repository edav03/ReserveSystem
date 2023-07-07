import { Injectable } from '@nestjs/common';
import { FacilitiesImgRepository } from '../domain/repository/FacilitiesImg.repository';

@Injectable()
export class GetAllFacilitiesImgService {
  constructor(
    private readonly facilitiesImgRepository: FacilitiesImgRepository,
  ) {}
  public async run(town: string) {
    return this.facilitiesImgRepository.getAllFacilityImg(town);
  }
}
