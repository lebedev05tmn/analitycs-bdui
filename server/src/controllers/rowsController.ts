import { Controller, HTTP_STATUSES } from '@/shared/types';
import { findTableMetadata, findTableRepository } from '@/repositories/tableRepository';
import { Like, Raw } from 'typeorm';

type ColumnState = { sort?: 'asc' | 'desc'; search?: string; id: string };

const rowsController: Controller = async (req, res) => {
    try {
        const repository = findTableRepository(req);

        if (!repository) {
            res.status(HTTP_STATUSES.NOT_FOUND_404).json({
                error: 'Table not found',
            });
            return;
        }

        const limit: number = req.body.limit ?? 100;
        const offset: number = req.body.offset ?? 100;
        const columnState: ColumnState[] = req.body.columnState ?? [];

        const whereConditions: any[] = [];
        const orderConditions: any = {};
        columnState.forEach((column) => {
            if (column.search) {
                whereConditions.push({
                    [column.id]: Raw((alias) => `CAST(${alias} AS TEXT) ILIKE :search`, {
                        search: `%${column.search}%`,
                    }),
                });
            }
            if (column.sort) {
                orderConditions[column.id] = column.sort.toUpperCase();
            }
        });

        const [data, totalCount] = await repository.findAndCount({
            take: limit,
            skip: offset,
            where: whereConditions?.length ? whereConditions : undefined,
            order: Object.keys(orderConditions).length ? orderConditions : undefined,
        });

        const totalPages = Math.ceil(totalCount / limit);

        res.status(HTTP_STATUSES.OK_200).json({
            data,
            totalCount,
            totalPages,
        });
    } catch (e) {
        res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).json({
            error: 'Failed to load rows',
        });
    }
};

export default rowsController;
