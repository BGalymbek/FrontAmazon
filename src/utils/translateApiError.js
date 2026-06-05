const API_ERROR_KEYS = {
  'Unable to load dormitory structure.': 'errors.loadDormLayout',
  'Unable to load available seats.': 'errors.loadSeats',
  'Please choose semester and seat.': 'booking.errorChooseSemesterSeat',
  'Booking data is missing. Please select seat again.': 'confirmation.missingDraft',
  'Booking created, but booking ID was not returned.': 'confirmation.noBookingId',
  'Failed to create booking. Seat may have been already reserved.': 'confirmation.createFailed',
  'You need to submit your documents before making a booking.': 'errors.submitDocsFirst',
  'Your documents have not been verified yet.': 'errors.docsNotVerified',
  'No active booking found to cancel.': 'errors.noActiveBooking',
  'Payment failed. Please check card details or try again.': 'payment.failed',
  'This booking does not belong to the current user.': 'errors.bookingNotYours',
  'This booking has already been paid for.': 'errors.bookingAlreadyPaid',
  'dormitory_id is required': 'errors.dormitoryRequired',
  'No documents found for the user.': 'errors.noDocuments',
  'File not found': 'errors.fileNotFound',
  'Please fill in both password fields.': 'reset.fillBoth',
  'Passwords do not match.': 'reset.passwordMismatch',
  'Failed to send reset link. Please try again.': 'reset.linkFailed',
  'Failed to update password. The reset link may be invalid or expired.': 'reset.genericError',
  'Payment failed.': 'payment.failDefault',
};

export function translateApiError(t, message) {
  if (!message) {
    return t('common.error');
  }

  const text = Array.isArray(message) ? message[0] : String(message);
  const directKey = API_ERROR_KEYS[text];
  if (directKey) {
    return t(directKey);
  }

  const lower = text.toLowerCase();
  if (lower.includes('already reserved') || lower.includes('not available')) {
    return t('confirmation.seatTaken');
  }
  if (lower.includes('email') && lower.includes('already')) {
    return t('register.emailTaken');
  }
  if (lower.includes('password')) {
    return t('reset.genericError');
  }

  return text;
}

export function setOopsMessageKey(key) {
  localStorage.setItem('messageDocSubmKey', key);
  localStorage.removeItem('messageDocSubm');
}

export function getOopsMessage(t) {
  const key = localStorage.getItem('messageDocSubmKey');
  if (key) {
    return t(key);
  }
  const legacy = localStorage.getItem('messageDocSubm');
  if (!legacy) {
    return t('oops.mustSubmitDocs');
  }
  if (legacy.includes('verify')) {
    return t('oops.mustVerifyDocs');
  }
  return t('oops.mustSubmitDocs');
}
