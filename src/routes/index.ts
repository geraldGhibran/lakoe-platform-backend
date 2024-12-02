import { Router } from 'express';
// import { authentication } from "../middlewares/authentication";
const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Ini app express lakoe',
  });
});

export default router;
