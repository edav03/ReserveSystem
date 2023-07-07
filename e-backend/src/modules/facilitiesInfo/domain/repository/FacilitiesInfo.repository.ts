import { Info } from '../entity/info.entity';

export abstract class FacilitiesInfoRepository {
  public abstract getFacilityInfo(
    town: string,
    facility: string,
  ): Promise<Info>;

  public abstract getFacilities(town: string): Promise<any>;

  public abstract insertNewFacility(newInfo: Info): Promise<boolean>;

  public abstract facilityAlreadyExists(
    town: string,
    facilityName: string,
  ): Promise<boolean>;

  public abstract getMunicipalities(): Promise<[]>;
}
