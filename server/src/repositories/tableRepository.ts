import { AppDataSource } from '@/data-source';
import { BankTransactions } from '@/entities/BankTransactions';
import { Controller, HTTP_STATUSES } from '@/shared/types';
import { Request, Response } from 'express';

export const tableEntities = {
    bankTransactions: BankTransactions,
};

export const findTableRepository = (req: Request) => {
    const id = req.query.id as keyof typeof tableEntities;

    if (!(id in tableEntities)) {
        return undefined;
    }

    return AppDataSource.getRepository(tableEntities[id]);
};

export const findTableMetadata = (req: Request) => {
    const id = req.query.id as keyof typeof tableEntities;

    if (!(id in tableEntities)) {
        return undefined;
    }

    return AppDataSource.getMetadata(tableEntities[id]);
}