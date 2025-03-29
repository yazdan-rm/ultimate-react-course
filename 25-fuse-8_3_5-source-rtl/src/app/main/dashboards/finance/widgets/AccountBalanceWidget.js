import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import ReactApexChart from 'react-apexcharts';
import { selectWidgets } from '../store/widgetsSlice';
import { localeConfigurationObject } from '@fuse/default-settings';
import moment from 'moment-jalaali';

function AccountBalanceWidget(props) {
  const theme = useTheme();
  const widgets = useSelector(selectWidgets);
  const { series, growRate, ami } = widgets?.accountBalance;

  const chartOptions = {
    chart: {
      locales: [...localeConfigurationObject],
      defaultLocale: 'fa',
      animations: {
        speed: 400,
        animateGradually: {
          enabled: false,
        },
      },
      fontFamily: 'inherit',
      foreColor: 'inherit',
      width: '100%',
      height: '100%',
      type: 'area',
      sparkline: {
        enabled: true,
      },
    },
    colors: [theme.palette.secondary.light, theme.palette.secondary.light],
    fill: {
      colors: [theme.palette.secondary.dark, theme.palette.secondary.light],
      opacity: 0.5,
    },
    series,
    stroke: {
      curve: 'straight',
      width: 2,
    },
    tooltip: {
      followCursor: true,
      theme: 'dark',
      x: {
        format: 'MMM dd, yyyy',
      },
      y: {
        formatter: (value) => `${value}%`,
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function(value, timestamp, opts) {
                  return moment(value).format('jD jMMMM jYYYY')
                }
              },
    },
  };

  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
      <div className="flex flex-col p-24 pb-16">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <Typography className="mr-16 text-lg font-medium tracking-tight leading-6 truncate">
              اعتبار حساب
            </Typography>
            <Typography className="font-medium" color="text.secondary">
              تراز ماهانه رشد و میانگین. درآمد ماهانه
            </Typography>
          </div>

          <div className="">
            <Chip size="small" className="font-medium text-sm" label="12 ماه" />
          </div>
        </div>
        <div className="flex items-start mt-24 mr-8">
          <div className="flex flex-col">
            <Typography className="font-semibold text-3xl md:text-5xl tracking-tighter">
              {growRate}%
            </Typography>
            <Typography className="font-medium text-sm leading-none" color="text.secondary">
              میانگین رشد ماهانه
            </Typography>
          </div>
          <div className="flex flex-col ml-32 md:ml-64">
            <Typography className="font-semibold text-3xl md:text-5xl">
              {/* {ami.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })} */}
              {Math.floor(ami).toLocaleString()}&nbsp;<small className="text-sm">ملیون تومان</small>
            </Typography>
            <Typography className="font-medium text-sm leading-none" color="text.secondary">
              میانگین درآمد ماهانه
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-auto">
        <ReactApexChart
          className="flex-auto w-full h-full"
          options={chartOptions}
          series={series}
          type={chartOptions.chart.type}
          height={chartOptions.chart.height}
        />
      </div>
    </Paper>
  );
}

export default AccountBalanceWidget;
