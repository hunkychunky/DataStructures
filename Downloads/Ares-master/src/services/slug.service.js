/**
 * RETURN UNIQUE SLUG FOR MODELS
 */

const generateSlug = () => {
  const prefix = 'BZ-';
  const code = Math.random().toString(36).substr(2, 6);

  return prefix + code;
};

module.exports = generateSlug;
