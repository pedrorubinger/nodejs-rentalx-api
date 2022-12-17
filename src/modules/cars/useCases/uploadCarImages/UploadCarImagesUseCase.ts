import { inject, injectable } from "tsyringe"

import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository"

interface IRequest {
  car_id: string
  images_name: string[]
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImageRepository")
    private carsImageRepository: ICarsImagesRepository
  ) {}

  async execute({ images_name, car_id }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImageRepository.create(car_id, image)
    })
  }
}

export { UploadCarImagesUseCase }
