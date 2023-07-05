import { Router } from "express";
import env from "../env.js";
import * as controller from "../controllers/chart.js";

const router = Router();

router.get(
    `/api/charts/${env.CHART_TYPE}/${env.DATA_TYPE}/:userId`,
    controller.getCharts
);
router.post(
    `/api/charts/${env.CHART_TYPE}/${env.DATA_TYPE}/delete/:id`,
    controller.postDeleteChart
);

router.get(
    `/api/charts/${env.CHART_TYPE}/${env.DATA_TYPE}/getChart/:id`,
    controller.getChart
);

export default router;
