import { NotFoundPage } from "@/pages/NotFoundPage";
import { LazyMainPage } from "@/pages/MainPage";
import { AppRoutes, getRouteLogin, getRouteMain, getRouteNotFound, getRouteRegister, getRouteProfile } from "@/shared/consts/router";
import { AppRouteProps } from "@/shared/types/router";
import { LazyLoginPage } from "@/pages/Login";
import { LazyRegisterPage } from "@/pages/Register";
import { LazyProfilePage } from "@/pages/ProfilePage";

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
	[AppRoutes.MAIN]: {
		path: getRouteMain(),
		element: <LazyMainPage />,
	},
	[AppRoutes.NOT_FOUND]: {
		path: getRouteNotFound(),
		element: <NotFoundPage />,
	},
	[AppRoutes.LOGIN]: {
		path: getRouteLogin(),
		element: <LazyLoginPage />,
	},
	[AppRoutes.REGISTER]: {
		path: getRouteRegister(),
		element: <LazyRegisterPage />,
	},
	[AppRoutes.PROFILE]: {
		path: getRouteProfile(),
		element: <LazyProfilePage />,
		authOnly: false, 
	},
};
