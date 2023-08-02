import {Router} from 'express'
import cartManager from '../CartManager.js'

const router = Router()

router.post('/', async (req,res) => {
    try {

    } catch (error) {
        res.status(500).json({error})
    }
} )

router.post('/:cid', async (req,res) => {
    try {

    } catch (error) {
        res.status(500).json({error})
    }
} )

router.get('/:cid/product/:pid', async (req,res) => {
    try {

    } catch (error) {
        res.status(500).json({error})
    }
} )

export default router