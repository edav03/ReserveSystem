import { FacilitiesInfoRepository } from 'src/modules/facilitiesInfo/domain/repository/FacilitiesInfo.repository';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Info } from 'src/modules/facilitiesInfo/domain/entity/info.entity';
import { facilityType } from '../../types/Facility';

export class FacilitiesInfoMysqlRepository extends FacilitiesInfoRepository {
  constructor(
    @InjectEntityManager() private readonly infoRepository: Repository<Info>,
  ) {
    super();
  }

  public async getMunicipalities() {
    const querySQL = `SELECT town FROM info`;
    const res = await this.infoRepository.query(querySQL);
    return res;
  }

  public async getFacilityInfo(town: string, facility: string) {
    const result = await this.infoRepository.query(
      `SELECT * FROM info WHERE town = '${town}' AND facility = '${facility}'`,
    );
    return result;
  }

  public async getFacilities(town: string) {
    const result = await this.infoRepository.query(
      `SELECT * FROM info WHERE town = '${town}'`,
    );
    return result;
  }

  public async insertNewFacility(newFacility: facilityType) {
    const querySQL = `INSERT INTO info (id, town, facility, price, location) VALUES ('${newFacility.id}','${newFacility.town}','${newFacility.facility}',${newFacility.price},'${newFacility.location}')`;
    await this.infoRepository.query(querySQL);
    return true;
  }

  public async facilityAlreadyExists(town: string, facilityName: string) {
    const querySQL = `SELECT * FROM info WHERE town = '${town}' AND facility = '${facilityName}'`;
    const res = await this.infoRepository.query(querySQL);
    return res.length > 0 ? true : false;
  }
}
