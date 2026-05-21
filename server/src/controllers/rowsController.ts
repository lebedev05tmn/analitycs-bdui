import { Controller, HTTP_STATUSES } from '@/shared/types';
import { BankTransactions } from '@/entities/BankTransactions';
import { AppDataSource } from '@/data-source';

const tableRepository = AppDataSource.getRepository(BankTransactions);

const tableController: Controller = async (req, res) => {
    try {
        const limit = Number((req.query.limit as string) ?? 100);
        const offset = Number((req.query.offset as string) ?? 100);

        const [rows, total] = await tableRepository.findAndCount({
            order: { id: 'DESC' },
            take: limit,
            skip: offset,
        });

        const totalCount = rows.length;
        const totalPages = Math.ceil(total / limit);
        const currentPage = Math.floor(offset / limit) + 1;

        res.status(HTTP_STATUSES.OK_200).json({
            data: rows,
            totalCount,
            totalPages,
            currentPage,
        });
    } catch {
        res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).json({
            error: 'Failed to load rows',
        });
    }
};

export default tableController;
