import * as dotenv from 'dotenv';
dotenv.config();
import commandLineArgs from 'command-line-args';

// Setup command line options
const options = commandLineArgs([
    {
        name: 'env',
        alias: 'e',
        defaultValue: 'development',
        type: String ,
    },
]);

const result = dotenv.config({
    path: `./env/${options.env}.env`,
});

if (result.error) {
    throw result.error;
}
