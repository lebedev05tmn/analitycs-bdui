import { Controller, HTTP_STATUSES } from '@/shared/types';
import { findTableRepository } from '@/repositories/tableRepository';

const rowsController: Controller = async (req, res) => {
    try {
        const repository = findTableRepository(req);

        if (!repository) {
            res.status(HTTP_STATUSES.NOT_FOUND_404).json({
                error: 'Table not found'
            });
            return;
        }

        const limit = Number((req.query.limit as string) ?? 100);
        const offset = Number((req.query.offset as string) ?? 100);

        const [data, totalCount] = await repository.findAndCount({
            take: limit,
            skip: offset,
        });

        const totalPages = Math.ceil(totalCount / limit);

       res.status(HTTP_STATUSES.OK_200).json({
            data,
            totalCount,
            totalPages,
        })
    } catch {
        res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).json({
            error: 'Failed to load rows',
        });
    }
};

export default rowsController;
