import express from 'express';
import passport from 'passport';
import categoryController from '../controllers/category.controller';
import categoryService from '../services/category.service';

export const categoryRouter = express.Router();

categoryRouter
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), categoryController.index)
  .post(passport.authenticate('jwt', { session: false }), categoryService.validateCreate, categoryController.create);

categoryRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), categoryController.show)
  .put(passport.authenticate('jwt', { session: false }), categoryService.validateCreate, categoryController.update)
  .delete(passport.authenticate('jwt', { session: false }), categoryController.destroy);


/**
* @swagger
* /categories:
*   get:
*     tags:
*       - Categories
*     name: All Categories
*     summary: List all categories
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: All categories fetched successfully
*       500:
*         description: Server Error
*       401:
*         description: Unauthorized
*
* /categories/{categoryId}:
*   get:
*     tags:
*       - Categories
*     name: Find a Category
*     summary: Finds a category
*     security:
*       - bearerAuth: []
*     produces:
*       - application/json
*     parameters:
*      - name: "categoryId"
*        in: "path"
*        description: "ID of category to return"
*        required: true
*        type: "string"
*     responses:
*       200:
*         description: A single user object
*       401:
*         description: Bad Request
*       400:
*         description: No auth token
*       403:
*         description: Forbidden
*
* @swagger
* /categories:
*   post:
*     tags:
*       - Categories
*     name: Create Category
*     summary: Creates a category
*     consumes:
*       - application/json
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             name:
*               type: string
*         required:
*           - name
*     responses:
*       200:
*         description: Category Created successfully
*       422:
*         description: Unprocessable Entity

* @swagger
* /categories/{categoryId}:
*   put:
*     tags:
*     - Categories
*     name: Update Category
*     summary: Updates a category
*     consumes:
*     - application/json
*     produces:
*     - "application/json"
*     security:
*     - bearerAuth: []
*     parameters:
*     - name: "categoryId"
*       in: "path"
*       description: "id that refers to the object"
*       required: true
*       type: "string"
*     - in: "body"
*       name: body
*       schema:
*         type: object
*         properties:
*           name:
*             type: string
*           active:
*             type: boolean
*         required:
*           - name
*
*     responses:
*       200:
*         description: Category Updated successfully
*       404:
*         description: Category not found
*       401:
*         description: Unauthorized
*       422:
*         description: Unprocessable Entity

* @swagger
*  /categories/{categoryId}:
*    delete:
*      tags:
*      - "Categories"
*      summary: "Delete category"
*      description: "This can only be done by the logged in user. Delete a Category"
*      operationId: "deleteCategory"
*      produces:
*      - "application/json"
*      security:
*      - bearerAuth: []
*      parameters:
*      - name: "categoryId"
*        in: "path"
*        description: "The id that needs to be deleted"
*        required: true
*        type: "string"
*      responses:
*        200:
*          description: Category Deleted Successfully
*        404:
*          description: Category not found
*        401:
*          description: Unauthorized
*        422:
*          description: Unprocessable Entity
*/
