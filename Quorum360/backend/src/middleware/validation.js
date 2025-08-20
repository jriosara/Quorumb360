const Joi = require('joi');

// Schema para registro de usuario
const registerSchema = Joi.object({
    nombre: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
        'string.empty': 'Nombre es requerido',
        'string.min': 'Nombre debe tener al menos 2 caracteres',
        'string.max': 'Nombre no puede exceder 100 caracteres',
        'any.required': 'Nombre es requerido'
        }),

    apellido: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
        'string.empty': 'Apellido es requerido',
        'string.min': 'Apellido debe tener al menos 2 caracteres',
        'string.max': 'Apellido no puede exceder 100 caracteres',
        'any.required': 'Apellido es requerido'
        }),

    correo: Joi.string()
        .email()
        .required()
        .messages({
        'string.empty': 'Correo electrónico es requerido',
        'string.email': 'Correo electrónico inválido',
        'any.required': 'Correo electrónico es requerido'
        }),

    telefono: Joi.string()
        .pattern(/^\d{10}$/)
        .required()
        .messages({
        'string.empty': 'Teléfono es requerido',
        'string.pattern.base': 'Teléfono debe tener 10 dígitos',
        'any.required': 'Teléfono es requerido'
        }),

    pais: Joi.string()
        .valid('colombia', 'mexico', 'argentina', 'chile', 'peru')
        .required()
        .messages({
        'string.empty': 'País es requerido',
        'any.only': 'País debe ser uno de los valores permitidos',
        'any.required': 'País es requerido'
        }),

    nombrePropiedad: Joi.string()
        .min(2)
        .max(255)
        .required()
        .messages({
        'string.empty': 'Nombre de propiedad es requerido',
        'string.min': 'Nombre de propiedad debe tener al menos 2 caracteres',
        'string.max': 'Nombre de propiedad no puede exceder 255 caracteres',
        'any.required': 'Nombre de propiedad es requerido'
        }),

    tipo: Joi.string()
        .valid('apartamento', 'casa', 'otro')
        .required()
        .messages({
        'string.empty': 'Tipo de propiedad es requerido',
        'any.only': 'Tipo de propiedad debe ser apartamento, casa u otro',
        'any.required': 'Tipo de propiedad es requerido'
        }),

    numero: Joi.string()
        .min(1)
        .max(50)
        .required()
        .messages({
        'string.empty': 'Número de propiedad es requerido',
        'string.min': 'Número de propiedad es requerido',
        'string.max': 'Número de propiedad no puede exceder 50 caracteres',
        'any.required': 'Número de propiedad es requerido'
        }),

    contrasena: Joi.string()
        .min(8)
        .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)'))
        .required()
        .messages({
        'string.empty': 'Contraseña es requerida',
        'string.min': 'Contraseña debe tener al menos 8 caracteres',
        'string.pattern.base': 'Contraseña debe contener al menos una mayúscula, una minúscula y un número',
        'any.required': 'Contraseña es requerida'
        })
    });

    // Schema para login
    const loginSchema = Joi.object({
    correo: Joi.string()
        .email()
        .required()
        .messages({
        'string.empty': 'Correo electrónico es requerido',
        'string.email': 'Correo electrónico inválido',
        'any.required': 'Correo electrónico es requerido'
        }),

    contrasena: Joi.string()
        .required()
        .messages({
        'string.empty': 'Contraseña es requerida',
        'any.required': 'Contraseña es requerida'
        })
    });

    // Schema para actualización de perfil
    const updateProfileSchema = Joi.object({
    nombre: Joi.string()
        .min(2)
        .max(100)
        .optional()
        .messages({
        'string.min': 'Nombre debe tener al menos 2 caracteres',
        'string.max': 'Nombre no puede exceder 100 caracteres'
        }),

    apellido: Joi.string()
        .min(2)
        .max(100)
        .optional()
        .messages({
        'string.min': 'Apellido debe tener al menos 2 caracteres',
        'string.max': 'Apellido no puede exceder 100 caracteres'
        }),

    telefono: Joi.string()
        .pattern(/^\d{10}$/)
        .optional()
        .messages({
        'string.pattern.base': 'Teléfono debe tener 10 dígitos'
        }),

    pais: Joi.string()
        .valid('colombia', 'mexico', 'argentina', 'chile', 'peru')
        .optional()
        .messages({
        'any.only': 'País debe ser uno de los valores permitidos'
        }),

    nombrePropiedad: Joi.string()
        .min(2)
        .max(255)
        .optional()
        .messages({
        'string.min': 'Nombre de propiedad debe tener al menos 2 caracteres',
        'string.max': 'Nombre de propiedad no puede exceder 255 caracteres'
        }),

    tipo: Joi.string()
        .valid('apartamento', 'casa', 'otro')
        .optional()
        .messages({
        'any.only': 'Tipo de propiedad debe ser apartamento, casa u otro'
        }),

    numero: Joi.string()
        .min(1)
        .max(50)
        .optional()
        .messages({
        'string.min': 'Número de propiedad es requerido',
        'string.max': 'Número de propiedad no puede exceder 50 caracteres'
        })
    });

    // Middleware de validación
    const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
        abortEarly: false, // Retorna todos los errores, no solo el primero
        stripUnknown: true // Remueve campos no definidos en el schema
        });

        if (error) {
        const errors = {};
        error.details.forEach(detail => {
            errors[detail.path[0]] = detail.message;
        });

        return res.status(400).json({
            success: false,
            message: 'Errores de validación',
            errors
        });
        }

        req.body = value; // Usar los datos validados y limpiados
        next();
    };
};

module.exports = {
    validate,
    registerSchema,
    loginSchema,
    updateProfileSchema
};