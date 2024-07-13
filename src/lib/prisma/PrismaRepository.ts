import { PrismaClient } from "@prisma/client";
import prisma from "./Prisma";

export class PrismaRepository {
  protected client: PrismaClient;

  constructor() {
    this.client = prisma;
  }
}
