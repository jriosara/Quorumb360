const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // Crear nuevo usuario
    static async create(userData) {
        const {
        nombre,
        apellido,
        correo,
        telefono,
        pais,
        nombrePropiedad,
        tipo,
        numero,
        contrasena
        } = userData;

        try {
        // Encriptar contraseña
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

        const query = `
            INSERT INTO usuarios (
            nombre, apellido, correo, telefono, pais, 
            nombre_propiedad, tipo, numero, contrasena
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            nombre,
            apellido,
            correo,
            telefono,
            pais,
            nombrePropiedad,
            tipo,
            numero,
            hashedPassword
        ];

        const [result] = await pool.execute(query, values);
        
        return {
            id: result.insertId,
            nombre,
            apellido,
            correo,
            telefono,
            pais,
            nombrePropiedad,
            tipo,
            numero
        };
        } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new Error('El correo electrónico ya está registrado');
        }
        throw error;
        }
    }

  // Buscar usuario por correo
    static async findByEmail(correo) {
        try {
        const query = `
            SELECT id, nombre, apellido, correo, telefono, pais, 
                nombre_propiedad, tipo, numero, contrasena, 
                fecha_creacion, activo
            FROM usuarios 
            WHERE correo = ? AND activo = TRUE
        `;
        
        const [rows] = await pool.execute(query, [correo]);
        return rows[0] || null;
        } catch (error) {
        throw error;
        }
    }

  // Buscar usuario por ID
    static async findById(id) {
        try {
        const query = `
            SELECT id, nombre, apellido, correo, telefono, pais, 
                nombre_propiedad, tipo, numero, fecha_creacion, activo
            FROM usuarios 
            WHERE id = ? AND activo = TRUE
        `;
        
        const [rows] = await pool.execute(query, [id]);
        return rows[0] || null;
        } catch (error) {
        throw error;
        }
    }

  // Verificar contraseña
    static async verifyPassword(plainPassword, hashedPassword) {
        try {
        return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (error) {
        throw error;
        }
    }

  // Actualizar usuario
    static async update(id, userData) {
        const {
        nombre,
        apellido,
        telefono,
        pais,
        nombrePropiedad,
        tipo,
        numero
        } = userData;

        try {
        const query = `
            UPDATE usuarios 
            SET nombre = ?, apellido = ?, telefono = ?, pais = ?, 
                nombre_propiedad = ?, tipo = ?, numero = ?
            WHERE id = ? AND activo = TRUE
        `;

        const values = [
            nombre,
            apellido,
            telefono,
            pais,
            nombrePropiedad,
            tipo,
            numero,
            id
        ];

        const [result] = await pool.execute(query, values);
        
        if (result.affectedRows === 0) {
            throw new Error('Usuario no encontrado');
        }

        return await this.findById(id);
        } catch (error) {
        throw error;
        }
    }

    // Eliminar usuario (soft delete)
    static async delete(id) {
        try {
        const query = `
            UPDATE usuarios 
            SET activo = FALSE 
            WHERE id = ?
        `;

        const [result] = await pool.execute(query, [id]);
        
        if (result.affectedRows === 0) {
            throw new Error('Usuario no encontrado');
        }

        return { message: 'Usuario eliminado correctamente' };
        } catch (error) {
        throw error;
        }
    }

    // Obtener todos los usuarios
    static async findAll(limit = 50, offset = 0) {
        try {
        const query = `
            SELECT id, nombre, apellido, correo, telefono, pais, 
                nombre_propiedad, tipo, numero, fecha_creacion
            FROM usuarios 
            WHERE activo = TRUE
            ORDER BY fecha_creacion DESC
            LIMIT ? OFFSET ?
        `;

        const [rows] = await pool.execute(query, [limit, offset]);
        return rows;
        } catch (error) {
        throw error;
        }
    }

    // Contar usuarios activos
    static async count() {
        try {
        const query = `
            SELECT COUNT(*) as total 
            FROM usuarios 
            WHERE activo = TRUE
        `;

        const [rows] = await pool.execute(query);
        return rows[0].total;
        } catch (error) {
        throw error;
        }
    }
}

module.exports = User;