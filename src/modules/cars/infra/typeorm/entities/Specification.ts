import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import { v4 } from "uuid"

@Entity("specifications")
class Specification {
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = v4()
    }

    this.created_at = new Date()
  }
}

export { Specification }
