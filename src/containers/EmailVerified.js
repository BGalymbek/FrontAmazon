import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function EmailVerified() {
  const [params] = useSearchParams();
  const success = params.get('success') === '1';

  return (
    <main>
      <div className="signing">
        <div className="container">
          <div className="logo">
            <img src={require('../img/logoDorm.png')} alt="logo" />
          </div>
          <div className="form-content">
            <div className="title-content">
              <h2>{success ? 'Email verified' : 'Verification failed'}</h2>
              <p>
                {success
                  ? 'Your account is active. You can sign in and continue with document submission.'
                  : 'The verification link is invalid or expired. Request a new registration or contact support.'}
              </p>
            </div>
            <Link className="btn" to="/" style={{ display: 'inline-block', textAlign: 'center' }}>
              Go to login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
