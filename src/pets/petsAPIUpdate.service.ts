import { Injectable } from '@nestjs/common';
import { PetRepository } from './pet.repository';
import { getPetsImageAPI } from 'src/apis/petImageAPIS';
import { getPetsAPI } from 'src/apis/petAPIS';
import { Pet } from './pet.entity';
import { PetInstance } from '@/apis/response/petResponse';

@Injectable()
export class PetsAPIService {
  constructor(private petRepository: PetRepository) {}

  async updatePetData() {
    let offset = 1;
    let hasData = true;
    const pageTerm = 10;

    while (hasData) {
      try {
        const petData = await this.fetchPetData(offset, pageTerm);

        if (petData !== null) {
          petData.map(async (petInfo) => {
            //Todo: animal_id 같은 데이터 있으면 일부 업데이트, 없으면 새로 삽입
            const pet = await this.findByPetId(petInfo.ANIMAL_NO);
            const { name, center } = this.parseString(petInfo.NM);
            if (pet !== undefined) {
              //Todo : 가져와서 데이터베이스 업데이트 진행
            } else {
              const pet = this.petRepository.create({
                pet_id: petInfo.ANIMAL_NO,
                name: name,
                center: center,
                enlistment_date: new Date(petInfo.ENTRNC_DATE),
                species: petInfo.SPCS,
                breeds: petInfo.BREEDS,
                sex: petInfo.SEXDSTN,
                age: petInfo.AGE,
                weight: petInfo.BDWGH,
                adp_status: petInfo.ADP_STTUS,
                temporary_protection_status: petInfo.TMPR_PRTC_STTUS,
                intro_url: petInfo.INTRCN_MVP_URL,
                intro_contents: await this.htmlParsing(petInfo.INTRCN_CN),
                temporary_protection_contents: await this.htmlParsing(
                  petInfo.TMPR_PRTC_CN,
                ),
                thumbnail_url: null,
              });
              await this.petRepository.save(pet);
            }
          });
          offset += pageTerm;
        } else {
          hasData = false;
          console.log('펫 정보 데이터 불러오기 완료');
        }
      } catch (error) {
        console.log(`데이터 가져오는 중 에러 발생 : ${error.MESSAGE}`);
        hasData = false;
      }
    }
  }

  async updatePetImageData() {
    let offset = 1;
    let hasData = true;
    const pageTerm = 20;

    while (hasData) {
      try {
        const petData = await this.fetchPetImageData(offset, pageTerm);

        if (petData !== null) {
          petData.map(async (petInfo) => {
            //ANIMAL_NO 찾아서 "PHOTO_KND":"THUMB" 만 저장
            if (petInfo.PHOTO_KND === 'THUMB') {
              const pet = await this.findByPetId(petInfo.ANIMAL_NO);
              if (pet !== undefined && pet.thumbnail_url === null) {
                pet.thumbnail_url = petInfo.PHOTO_URL;
                await this.petRepository.save(pet);
              }
            }
          });
          offset += pageTerm;
        } else {
          hasData = false;
          console.log('펫 이미지 데이터 불러오기 완료');
        }
      } catch (error) {
        console.log(`이미지 데이터 가져오는 중 에러 발생 : ${error.MESSAGE}`);
        hasData = false;
      }
    }
  }
  async findByPetId(pet_id: number): Promise<Pet | undefined> {
    return this.petRepository.findOne({ where: { pet_id: pet_id } });
  }

  parseString(input: string): { name: string; center: string } {
    const match = input.match(/([^(\s]+)(?:\(([^)]+)\))?/);

    if (match && match.length >= 1) {
      const name = match[1].trim();
      const center = match[2] ? match[2].trim() : null;
      return { name, center };
    }
    return { name: null, center: null };
  }

  htmlParsing(html: string) {
    const cheerio = require('cheerio');
    const $ = cheerio.load(html);
    return $.text();
  }

  fetchPetData = async (
    offset: number,
    pageTerm: number,
  ): Promise<PetInstance[] | null> => {
    try {
      const petData = await getPetsAPI(offset, pageTerm);

      if (petData) {
        return petData.row;
      } else {
        return null;
      }
    } catch (error) {
      console.error('펫 API 데이터를 불러오는 중 오류 발생:', error);
    }
  };

  fetchPetImageData = async (offset: number, pageTerm: number) => {
    try {
      const petData = await getPetsImageAPI(offset, pageTerm);

      if (petData) {
        return petData.row;
      } else {
        return null;
      }
    } catch (error) {
      console.error('펫 이미지 API 데이터를 불러오는 중 오류 발생:', error);
    }
  };
}
