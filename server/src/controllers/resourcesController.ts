import { Controller, HTTP_STATUSES } from '@/shared/types';
import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { Validator } from 'jsonschema';

const RESOURCES_DIR = path.join(__dirname, '../resources');
const SCHEMAS_DIR = path.join(__dirname, '../../../schemas');

const validator = new Validator();

const sidebarController: Controller = async (req, res) => {
    try {
        const { filename } = req.params;

        if (typeof filename !== 'string') {
            res.status(HTTP_STATUSES.BAD_REQUEST_400).json({
                error: 'Invalid reosurce name',
            });
            return;
        }

        const filePath = path.join(RESOURCES_DIR, `${filename}.yaml`);
        const schemaPath = path.join(SCHEMAS_DIR, `${filename}.yaml`);

        try {
            await fs.access(filePath);
            await fs.access(schemaPath);
        } catch {
            res.status(HTTP_STATUSES.NOT_FOUND_404).json({
                error: `Resource file '${filename}' not found`,
            });
            return;
        }

        const yamlContent = await fs.readFile(filePath, 'utf8');
        const schemaYamlContent = await fs.readFile(schemaPath, 'utf8');
        const schema: any = yaml.load(schemaYamlContent);
        const data = yaml.load(yamlContent);

        const validationResult = validator.validate(data, schema);

        if (!validationResult.valid) {
            res.status(HTTP_STATUSES.UNPROCESSABLE_ENTITY_422).json({
                error: `Resource is invalid: \n${validationResult.errors.map(error => `${error.property} : ${error.message}`).join(',')}`,
            });
            return;
        }

        res.status(HTTP_STATUSES.OK_200).json(data);

    } catch {
        res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).json({
            error: 'Failed to load resource',
        });
    }
}

export default sidebarController;
