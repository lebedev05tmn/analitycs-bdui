import { Controller, HTTP_STATUSES } from '@/shared/types';

const tableController: Controller = async (_, res) => {
    try {
        const rows: any[] = [
            { id: '1', Status: 'Paid', Method: 'Credit Card', Amount: '$250.00' },
            { id: '2', Status: 'Pending', Method: 'PayPal', Amount: '$150.00' },
            { id: '3', Status: 'Failed', Method: 'Bank Transfer', Amount: '$350.00' },
        ];
        const columns: any[] = [{ header: 'Status' }, { header: 'Method' }, { header: 'Amount' }];
        setTimeout(() => res.status(HTTP_STATUSES.OK_200).json({ rows, columns }), 30000);
    } catch {
        res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).json({
            error: 'Failed to load sidebar configuration',
        });
    }
};

export default tableController;
