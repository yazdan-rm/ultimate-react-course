import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { useAppSelector } from 'app/store/hooks';
import { selectContrastMainTheme } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import { darken, useTheme } from '@mui/material/styles';
import green from '@mui/material/colors/green';
import blue from '@mui/material/colors/blue';
import red from '@mui/material/colors/red';
import orange from '@mui/material/colors/orange';
import FuseTheme from '@fuse/core/FuseTheme';
import yellow from '@mui/material/colors/yellow';

const variantBgColors = {
	success: green[600],
	info: blue[700],
	error: red[600],
	warning: orange[600],
	alert: yellow[700]
};

/**
 * The notification card.
 */
function NotificationCard(props) {
	const { item, className, onClose } = props;
	const theme = useTheme();
	const defaultBgColor = theme.palette.background.paper;
	let bgColor = variantBgColors[item.variant] || defaultBgColor;

	if (item.variant === 'primary') {
		bgColor = theme.palette.primary.main;
	}

	if (item.variant === 'secondary') {
		bgColor = theme.palette.secondary.main;
	}

	const contrastTheme = useAppSelector(selectContrastMainTheme(bgColor));
	const handleClose = (ev) => {
		ev.preventDefault();
		ev.stopPropagation();

		if (onClose) {
			onClose(item?.id);
		}
	};
	return (
		<FuseTheme theme={contrastTheme}>
			<Card
				className={clsx(
					'relative flex min-h-64 w-full items-center space-x-8 rounded-16 p-20 shadow',
					className
				)}
				sx={{
					backgroundColor: bgColor,
					color: contrastTheme.palette.text.primary,
					...(item.link ? { '&:hover': { backgroundColor: darken(bgColor, 0.05) } } : {})
				}}
				elevation={0}
				component={item.link ? NavLinkAdapter : 'div'}
				to={item.link || ''}
				role={item.link && 'button'}
			>
				{item.icon && !item.image && (
					<Box
						sx={{ backgroundColor: darken(bgColor, contrastTheme.palette.mode === 'dark' ? 0.3 : 0.1) }}
						className="mr-12 flex h-32 w-32 shrink-0 items-center justify-center rounded-full"
					>
						<FuseSvgIcon
							className="opacity-75"
							color="inherit"
						>
							{item.icon}
						</FuseSvgIcon>
					</Box>
				)}

				{item.image && (
					<img
						className="mr-12 h-32 w-32 shrink-0 overflow-hidden rounded-full object-cover object-center"
						src={item.image}
						alt="Notification"
					/>
				)}

				<div className="flex flex-auto flex-col">
					{item.title && <Typography className="line-clamp-1 font-semibold">{item.title}</Typography>}

					{item.description && (
						<div
							className="line-clamp-2"
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{ __html: item.description }}
						/>
					)}

					{item.time && (
						<Typography
							className="mt-8 text-sm leading-none "
							color="text.secondary"
						>
							{formatDistanceToNow(new Date(item.time), { addSuffix: true })}
						</Typography>
					)}
				</div>

				<IconButton
					disableRipple
					className="absolute right-0 top-0 p-8"
					color="inherit"
					size="small"
					onClick={handleClose}
				>
					<FuseSvgIcon
						size={12}
						className="opacity-75"
						color="inherit"
					>
						heroicons-solid:x
					</FuseSvgIcon>
				</IconButton>
				{item.children}
			</Card>
		</FuseTheme>
	);
}

export default NotificationCard;
