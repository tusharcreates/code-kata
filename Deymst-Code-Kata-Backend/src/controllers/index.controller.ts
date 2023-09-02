import { NextFunction, Request, Response } from 'express';

const demoData = [
  {
    year: 2020,
    month: 12,
    profitOrLoss: 250000,
    assetsValue: 1234,
  },
  {
    year: 2020,
    month: 11,
    profitOrLoss: 1150,
    assetsValue: 5789,
  },
  {
    year: 2020,
    month: 10,
    profitOrLoss: 2500,
    assetsValue: 22345,
  },
  {
    year: 2020,
    month: 9,
    profitOrLoss: -187000,
    assetsValue: 223452,
  },
  {
    year: 2020,
    month: 8,
    profitOrLoss: 35000,
    assetsValue: 45678,
  },
  {
    year: 2020,
    month: 7,
    profitOrLoss: -5000,
    assetsValue: 56789,
  },
  {
    year: 2020,
    month: 6,
    profitOrLoss: 7500,
    assetsValue: 67890,
  },
  {
    year: 2020,
    month: 5,
    profitOrLoss: -10000,
    assetsValue: 78901,
  },
  {
    year: 2020,
    month: 4,
    profitOrLoss: 18000,
    assetsValue: 89012,
  },
  {
    year: 2020,
    month: 3,
    profitOrLoss: -6000,
    assetsValue: 90123,
  },
  {
    year: 2020,
    month: 2,
    profitOrLoss: 12000,
    assetsValue: 101234,
  },
  {
    year: 2020,
    month: 1,
    profitOrLoss: 30000,
    assetsValue: 111234,
  },
];

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
  public getSpreadsheetData = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { companyName, loanAmount, provider } = req.query;
      if (!companyName || !loanAmount || !provider) {
        res.status(400).send('Missing required fields');
      } else {
        //get data from the provdier using the provider name and company name
        //for now regardless of the provider, we will just return the same data

        res.status(200).send({ data: demoData, message: 'Successfully retrieved data' });
      }
    } catch (error) {
      next(error);
    }
  };
  public getLoanOutcome = (req: Request, res: Response, next: NextFunction): void => {
    let preAssessment = 20; //default value

    // Assumes entries are in reverse chronological order.

    // sort demoData by year and month
    const sortedSpreadSheet = demoData.sort((a, b) => {
      if (a.year === b.year) {
        return b.month - a.month;
      }
      return b.year - a.year;
    });

    const data12Months = sortedSpreadSheet.slice(0, 12);

    const profit12Months = data12Months.reduce((total, month) => total + month.profitOrLoss, 0);

    const assets12MonthsAverage = data12Months.reduce((total, month) => total + month.assetsValue, 0) / 12;

    if (profit12Months > 0) {
      preAssessment = 60;
    }

    if (assets12MonthsAverage > req.body.loanAmount) {
      preAssessment = 100;
    }

    const yearlySummary:{
      [key: number]: {
        totalProfitOrLoss: number;
        totalAssetsValue: number;
      };
    } = {};

    // Loop through the data and calculate the yearly summary
    sortedSpreadSheet.forEach(entry => {
      const { year, profitOrLoss, assetsValue } = entry;

      // Check if the year exists in the yearly summary object
      if (!yearlySummary[year]) {
        yearlySummary[year] = {
          totalProfitOrLoss: 0,
          totalAssetsValue: 0,
        };
      }

      // Add the profit/loss and assets value to the yearly summary
      yearlySummary[year].totalProfitOrLoss += profitOrLoss;
      yearlySummary[year].totalAssetsValue += assetsValue;
    });

    // Convert the yearly summary object to an array of objects
    const yearlySummaryArray = Object.entries(yearlySummary).map(([year, data]) => ({
      year: parseInt(year),
      totalProfitOrLoss: data.totalProfitOrLoss,
      totalAssetsValue: data.totalAssetsValue,
    }));

    console.log(yearlySummaryArray);

    const decisionEngineResponse = {
      annualSummary: yearlySummary,
      outcome: 'approved',
      preAssessment: preAssessment,
    };

    res.status(200).send({ data: decisionEngineResponse, message: 'Successfully retrieved loan outcome' });
  };
}

export default IndexController;
