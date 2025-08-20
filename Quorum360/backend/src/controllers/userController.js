const User = require('../models/User');
const { generateToken } = require('../middleware/auth');

const userController = {
  // Registrar nuevo usuario
  register: async (req, res) => {
    try {
      const userData = req.body;

      // Verificar si el usuario ya existe
      const existingUser = await User.findByEmail(userData.correo);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'El correo electrónico ya está registrado'
        });
      }

      // Crear el usuario
      const newUser = await User.create(userData);

      // Generar token
      const token = generateToken(newUser.id);

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: {
          user: newUser,
          token
        }
      });

    } catch (error) {
      console.error('Error en registro:', error);
      if (error.message === 'El correo electrónico ya está registrado') {
        return res.status(409).json({
          success: false,
          message: error.message
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Login de usuario
  login: async (req, res) => {
    try {
      const { correo, contrasena } = req.body;

      // Buscar usuario por correo
      const user = await User.findByEmail(correo);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }

      // Verificar contraseña
      const isPasswordValid = await User.verifyPassword(contrasena, user.contrasena);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }

      // Generar token
      const token = generateToken(user.id);

      // Remover contraseña de la respuesta
      const { contrasena: _, ...userWithoutPassword } = user;

      res.json({
        success: true,
        message: 'Login exitoso',
        data: {
          user: userWithoutPassword,
          token
        }
      });

    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Obtener perfil del usuario
  getProfile: async (req, res) => {
    try {
      // El usuario está disponible en req.user gracias al middleware de autenticación
      const user = req.user;

      res.json({
        success: true,
        data: {
          user
        }
      });

    } catch (error) {
      console.error('Error al obtener perfil:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Actualizar perfil del usuario (autenticado)
  updateProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const updateData = req.body;

      // Actualizar usuario
      const updatedUser = await User.update(userId, updateData);

      res.json({
        success: true,
        message: 'Perfil actualizado exitosamente',
        data: {
          user: updatedUser
        }
      });

    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      if (error.message === 'Usuario no encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Obtener todos los usuarios (admin)
  getAllUsers: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const users = await User.findAll(limit, offset);
      const total = await User.count();

      res.json({
        success: true,
        data: {
          users,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
          }
        }
      });

    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Obtener usuario por ID
  getUserById: async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      res.json({
        success: true,
        data: {
          user
        }
      });

    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Actualizar usuario por ID (admin o control externo)
  updateUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const updateData = req.body;

      const updatedUser = await User.update(userId, updateData);

      res.json({
        success: true,
        message: 'Usuario actualizado correctamente',
        data: updatedUser
      });

    } catch (error) {
      console.error('Error al actualizar usuario por ID:', error);

      if (error.message === 'Usuario no encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },
 // Eliminar perfil del usuario autenticado

  deleteProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const result = await User.delete(userId); // ✅ usar tu método personalizado
      res.status(200).json({ success: true, message: result.message });
    } catch (error) {
      console.error('Error en deleteProfile:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  // Eliminar usuario por ID (admin)

  deleteUserById: async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await User.delete(userId);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    console.error('Error en deleteUserById:', error);  // imprime el error completo
    res.status(500).json({ error: error.message });
  }
}

};

module.exports = userController;


