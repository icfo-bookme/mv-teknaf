// Change contact numbers here to update every section of the website.
export const contact = {
  primaryPhone: '01841666644',
  secondaryPhone: '',
  // Leave empty to use primaryPhone for WhatsApp as well.
  whatsappPhone: '',
};

export const phoneNumbers = [contact.primaryPhone, contact.secondaryPhone].filter(Boolean);

function internationalDigits(number) {
  const digits = String(number).replace(/\D/g, '');
  return digits.startsWith('0') ? '88' + digits : digits;
}

export function getCallHref(number = contact.primaryPhone) {
  return 'tel:+' + internationalDigits(number);
}

export function getWhatsAppHref(message = '') {
  const url = 'https://wa.me/' + internationalDigits(contact.whatsappPhone || contact.primaryPhone);
  return message ? url + '?text=' + encodeURIComponent(message) : url;
}
