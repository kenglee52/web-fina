const express = require("express");
const { createSlider, getSliders, deleteSlider ,updateSlider} =require ("../contorllers/sliderController");

const { uploadpopup, getPopups,deletePopup } = require('../contorllers/marketing');
const {authCheck,marketingCheck, hrCheck} = require("../middlewares/authCheck");

const upload = require('../middlewares/showpopup'); // Multer for photo
const promotionController = require("../contorllers/promotion");

const uploadfileslider = require('../middlewares/slider'); // Multer for photo
const uploadNews = require('../middlewares/news'); // Multer for photopromotion
const uploadpromotion = require('../middlewares/promotion'); // Multer for photopromotion

const {
  createNews,
  getNews,
  deleteNews,
  updateNews,
  getNewsById
} = require('../contorllers/news');
const {
  createPromotion,
  getPromotions,
  getPromotionById,
  deletePromotion,
  updatePromotion,
} = require('../contorllers/promotion');
const {
  createFaq,
  getAllFaqs,
  updateFaq,
  deleteFaq,
  
} = require('../contorllers/fap');
const router = express.Router();
router.get('/faqs', getAllFaqs);
router.post('/faqs',authCheck,marketingCheck, createFaq);
router.put('/faqs/:id',authCheck,marketingCheck, updateFaq);
router.delete('/faqs/:id',authCheck,marketingCheck, deleteFaq);

// Handle CV and photo uploads with Multer
router.post('/uploadpopup', authCheck, marketingCheck, upload.single('popup'), uploadpopup);

router.get('/getpopups',getPopups);
router.delete('/deletepopup',authCheck,marketingCheck, deletePopup);



// slider
router.get("/sliders", getSliders);
router.post('/sliders', authCheck, marketingCheck, uploadfileslider.single('slider'), createSlider);
router.delete("/sliders/:id", authCheck, marketingCheck, deleteSlider);
router.put('/sliders/:id', authCheck, marketingCheck, uploadfileslider.single('slider'), updateSlider);



// News routes
router.get('/news', getNews);
router.get('/news/:id', getNewsById);
router.post('/news', authCheck, marketingCheck, uploadNews.single('news'), createNews);
router.delete('/news/:id', authCheck, marketingCheck, deleteNews);
router.put('/news/:id', authCheck, marketingCheck, uploadNews.single('news'), updateNews);



// Promotion routes
router.get('/promotion', getPromotions);
router.get('/promotion/:id', getPromotionById);
router.post('/promotion', authCheck, uploadpromotion.single('promotion'), createPromotion);
router.delete('/promotion/:id', authCheck, marketingCheck, deletePromotion);
router.put('/promotion/:id', authCheck, marketingCheck, uploadpromotion.single('promotion'), updatePromotion);
router.get("/:id", promotionController.getPromotionById);
module.exports = router;