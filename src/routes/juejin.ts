import { getTodayCheckinStatus } from './controllers/juejin/checkin_status';
import router from './route';

export const juejinRoutes = router.prefix('/juejin').get('/checkin/status', getTodayCheckinStatus);
// .post('/checkin', postCheckin)
// .get('/checkin/list', getCheckinList);
