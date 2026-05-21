import { Controller, HTTP_STATUSES } from '@/shared/types';
import { AppDataSource } from '@/data-source';
import { BankTransactions } from '@/entities/BankTransactions';

const columnsController: Controller = async (req, res) => {
    try {
        const entityMetadata = AppDataSource.getMetadata(BankTransactions);
        const columns = entityMetadata.columns.map((column) => ({
            header: column.propertyName,
            type: column.type,
        }));

        res.status(HTTP_STATUSES.OK_200).json(columns);
    } catch {
        res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).json({
            error: 'Failed to load columns',
        });
    }
};

export default columnsController;
