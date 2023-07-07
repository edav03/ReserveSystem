import { InjectEntityManager } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacilitiesImgRepository } from 'src/modules/facilitiesInfo/domain/repository/FacilitiesImg.repository';
import { Img } from 'src/modules/facilitiesInfo/domain/entity/img.entity';

export class FacilitiesImgMysqlRepository extends FacilitiesImgRepository {
  constructor(
    @InjectEntityManager() private readonly infoRepository: Repository<Img>,
  ) {
    super();
  }

  public async getAllFacilityImg(town: string) {
    const result = await this.infoRepository.query(
      `SELECT * FROM images WHERE town = '${town}'`,
    );
    return result;
  }

  public async getFacilityImg(town: string, facility: string) {
    const result = await this.infoRepository.query(
      `SELECT * FROM images WHERE town = '${town}' AND facility = '${facility}'`,
    );
    return result;
  }

  public async insertFacilityImg(img: Img) {
    if (
      await this.infoRepository.query(
        `INSERT INTO images (town, facility, src, parent_id) VALUES ('${img.town}','${img.facility}','${img.src}', '${img.id}')`,
      )
    ) {
      return true;
    }

    return false;
  }
}
