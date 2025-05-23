import Paper from '@mui/material/Paper';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import IconButton from '@mui/material/IconButton';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import FuseLoading from '@fuse/core/FuseLoading';
import _ from '@lodash';
import { useGetProjectDashboardWidgetsQuery } from '../../../ProjectDashboardApi';

/**
 * The MonthlyExpensesWidget widget.
 */
function MonthlyExpensesWidget() {
	const { data: widgets, isLoading } = useGetProjectDashboardWidgetsQuery();

	if (isLoading) {
		return <FuseLoading />;
	}

	const widget = widgets?.monthlyExpenses;

	if (!widget) {
		return null;
	}

	const { amount, series, labels } = widget;
	const theme = useTheme();
	const chartOptions = {
		chart: {
			animations: {
				enabled: false
			},
			fontFamily: 'inherit',
			foreColor: 'inherit',
			height: '100%',
			type: 'line',
			sparkline: {
				enabled: true
			}
		},
		colors: [theme.palette.success.main],
		stroke: {
			curve: 'smooth'
		},
		tooltip: {
			theme: 'dark'
		},
		xaxis: {
			type: 'category',
			categories: labels
		},
		yaxis: {
			labels: {
				formatter: (val) => `$${val}`
			}
		}
	};
	return (
		<Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
			<div className="flex items-start justify-between">
				<div className="text-lg font-medium tracking-tight leading-6 truncate">Monthly Expenses</div>
				<div className="ml-8 -mt-8 -mr-12">
					<IconButton>
						<FuseSvgIcon size={20}>heroicons-solid:dots-vertical</FuseSvgIcon>
					</IconButton>
				</div>
			</div>
			<div className="flex items-center mt-4">
				<div className="flex flex-col">
					<div className="text-3xl font-semibold tracking-tight leading-tight">
						{amount.toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD'
						})}
					</div>
					<div className="flex items-center">
						<FuseSvgIcon
							className="mr-4 text-red-500"
							size={20}
						>
							heroicons-solid:trending-up
						</FuseSvgIcon>
						<Typography className="font-medium text-sm text-secondary leading-none whitespace-nowrap">
							<span className="text-red-500">2%</span>
							<span> above projected</span>
						</Typography>
					</div>
				</div>
				<div className="flex flex-col flex-auto ml-32">
					<ReactApexChart
						className="flex-auto w-full h-64"
						options={chartOptions}
						series={_.cloneDeep(series)}
						type={chartOptions?.chart?.type}
						height={chartOptions?.chart?.height}
					/>
				</div>
			</div>
		</Paper>
	);
}

export default MonthlyExpensesWidget;
