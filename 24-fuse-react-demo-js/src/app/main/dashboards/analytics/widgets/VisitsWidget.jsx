import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useAppSelector } from 'app/store/hooks';
import _ from '@lodash';
import { selectWidget } from '../AnalyticsDashboardApi';

/**
 * Impressions widget.
 */
function Impressions() {
	const theme = useTheme();
	const widget = useAppSelector(selectWidget('visits'));

	if (!widget) {
		return null;
	}

	const { series, amount, labels } = widget;
	const chartOptions = {
		chart: {
			animations: {
				enabled: false
			},
			fontFamily: 'inherit',
			foreColor: 'inherit',
			height: '100%',
			type: 'area',
			sparkline: {
				enabled: true
			}
		},
		colors: [theme.palette.error.main],
		fill: {
			colors: [theme.palette.error.light],
			opacity: 0.5
		},
		stroke: {
			curve: 'smooth'
		},
		tooltip: {
			followCursor: true,
			theme: 'dark'
		},
		xaxis: {
			type: 'category',
			categories: labels
		}
	};
	return (
		<Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
			<div className="flex items-start justify-between m-24 mb-0">
				<Typography className="text-lg font-medium tracking-tight leading-6 truncate">Visits</Typography>
				<div className="ml-8">
					<Chip
						size="small"
						className="font-medium text-sm"
						label=" 30 days"
					/>
				</div>
			</div>
			<div className="flex flex-col lg:flex-row lg:items-center mx-24 mt-12">
				<Typography className="text-7xl font-bold tracking-tighter leading-tight">
					{amount.toLocaleString('en-US')}
				</Typography>
				<div className="flex lg:flex-col lg:ml-12">
					<FuseSvgIcon
						size={20}
						className="text-red-500"
					>
						heroicons-solid:trending-down
					</FuseSvgIcon>
					<Typography
						className="flex items-center ml-4 lg:ml-0 lg:mt-2 text-md leading-none whitespace-nowrap"
						color="text.secondary"
					>
						<span className="font-medium text-red-500">4%</span>
						<span className="ml-4">below target</span>
					</Typography>
				</div>
			</div>
			<div className="flex flex-col flex-auto h-80">
				<ReactApexChart
					options={chartOptions}
					series={_.cloneDeep(series)}
					type={chartOptions?.chart?.type}
					height={chartOptions?.chart?.height}
				/>
			</div>
		</Paper>
	);
}

export default Impressions;
