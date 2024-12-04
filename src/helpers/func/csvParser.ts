import * as Papa from 'papaparse';

interface CSVRow {
    [key: string]: string;
}

export const parseCSV = async (file: string): Promise<CSVRow[]> => {
    const response = await fetch(file);
    const text = await response.text();

    return new Promise((resolve) => {
        Papa.parse<CSVRow>(text, {
            header: true,
            complete: (results: Papa.ParseResult<CSVRow>) => resolve(results.data), // Указываем тип для results
        });
    });
};
