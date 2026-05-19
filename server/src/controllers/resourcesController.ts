import { Controller, HTTP_STATUSES } from '@/shared/types';
import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const sidebarController: Controller = async (req, res) => {
    try {
        const yamlPath = path.join(__dirname, '../resources/sidebar.yml');
        const yamlContent = await fs.readFile(yamlPath, 'utf8');
        const sidebar = yaml.load(yamlContent);
        res.status(HTTP_STATUSES.OK_200).json(sidebar);
    } catch {
        res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).json({
            error: 'Failed to load sidebar configuration',
        });
    }
};

export default sidebarController;
