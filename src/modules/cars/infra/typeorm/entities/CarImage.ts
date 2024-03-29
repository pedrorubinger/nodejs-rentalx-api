import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm"
import { v4 } from "uuid"

@Entity("cars_image")
class CarImage {
  @PrimaryColumn()
  id: string

  @Column()
  car_id: string

  @Column()
  image_name: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = v4()
    }
  }
}

export { CarImage }
