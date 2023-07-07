import { Img } from '../entity/img.entity';

export abstract class FacilitiesImgRepository {
  public abstract getAllFacilityImg(town: string): Promise<Img[]>;
  public abstract getFacilityImg(town: string, facility: string): Promise<Img>;
  public abstract insertFacilityImg(img: Img): Promise<boolean>;
}
