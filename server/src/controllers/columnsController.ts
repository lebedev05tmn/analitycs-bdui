import { Controller, HTTP_STATUSES } from '@/shared/types';
import { findTableMetadata } from '@/repositories/tableRepository';

const columnsController: Controller = async (req, res) => {
    try {
        const entityMetadata = findTableMetadata(req)
        
       if (!entityMetadata) {
            res.status(HTTP_STATUSES.NOT_FOUND_404).json({
                error: 'Table not found'
            });
            return;
        }

        const columns = entityMetadata.columns.filter(col => col.propertyName !== 'id').map((column) => ({
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
