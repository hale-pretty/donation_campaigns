import { Redirect } from 'react-router-dom';
import NotFound from '~/pages/NotFound';

export default [
	{
		key: 'errors',
		name: 'Lỗi',
		component: () => <Redirect exact to="/errors/404" />,
		path: '/errors',
		hide: true,
		children: [
			{
				key: 'errors.404',
				name: '404',
				component: NotFound,
				path: '/errors/404',
				hide: true,
				template: 'document',
			},
		],
	},
];
