import { gql } from "@apollo/client";

export const ViewReservations = gql`
  query viewReservations {
    viewReservations {
      checkin_time
      checkout_time
      createdAt
      Id

      user {
        firstName
        middleName
        lastName
        phone_no
        fullName
      }
      hotel {
        name
      }
      room {
        room_no
        floor_no
      }
    }
  }
`;
export const HashVisaAndMastercardPaymentInfo = gql`
  query hashVisaAndMastercardPaymentInfo(
    $price: String
    $reservationId: String
    $Redirect_url: String
    $paymentMethod: String
  ) {
    hashVisaAndMastercardPaymentInfo(
      price: $price
      reservationId: $reservationId
      Redirect_url: $Redirect_url
      paymentMethod: $paymentMethod
    ) {
      amount
      access_key
      currency
      locale
      payment_method
      profile_id
      reference_number
      signed_date_time
      signed_field_names
      transaction_type
      transaction_uuid
      unsigned_field_names
      signature
      bill_to_address_postal_code
      bill_to_email
      bill_to_forename
      bill_to_phone
      bill_to_surname
      card_type
    }
  }
`;
export const SellerHashVisaAndMastercardPaymentInfo = gql`
  query sellerHashVisaAndMastercardPaymentInfo(
    $price: String
    $reservationId: String
    $Redirect_url: String
    $paymentMethod: String
  ) {
    sellerHashVisaAndMastercardPaymentInfo(
      price: $price
      reservationId: $reservationId
      Redirect_url: $Redirect_url
      paymentMethod: $paymentMethod
    ) {
      amount
      access_key
      currency
      locale
      payment_method
      profile_id
      reference_number
      signed_date_time
      signed_field_names
      transaction_type
      transaction_uuid
      unsigned_field_names
      signature
      bill_to_address_postal_code
      bill_to_email
      bill_to_forename
      bill_to_phone
      bill_to_surname
      card_type
    }
  }
`;
export const UserHashVisaAndMastercardPaymentInfo = gql`
  query userHashVisaAndMastercardPaymentInfo(
    $price: String
    $reservationId: String
    $Redirect_url: String
    $paymentMethod: String
  ) {
    userHashVisaAndMastercardPaymentInfo(
      price: $price
      reservationId: $reservationId
      Redirect_url: $Redirect_url
      paymentMethod: $paymentMethod
    ) {
      amount
      access_key
      currency
      locale
      payment_method
      profile_id
      reference_number
      signed_date_time
      signed_field_names
      transaction_type
      transaction_uuid
      unsigned_field_names
      signature
      bill_to_address_postal_code
      bill_to_email
      bill_to_forename
      bill_to_phone
      bill_to_surname
      card_type
    }
  }
`;
export const PayUsingAwashBank = gql`
  query payWithAwashBank(
    $PhoneNo: String
    $Price: String
    $ReservationId: String
    $Otp: String
    $AwashBankAccountNumber: String
    $step: Int
  ) {
    payWithAwashBank(
      phone_no: $PhoneNo
      price: $Price
      reservationId: $ReservationId
      otp: $Otp
      awash_bank_account_number: $AwashBankAccountNumber
      step: $step
    ) {
      message
      success
      statusCode
      statusDescription
    }
  }
`;
export const SellerPayWithAwashBank = gql`
  query sellerPayWithAwashBank(
    $PhoneNo: String
    $Price: String
    $ReservationId: String
    $Otp: String
    $AwashBankAccountNumber: String
    $step: Int
  ) {
    sellerPayWithAwashBank(
      phone_no: $PhoneNo
      price: $Price
      reservationId: $ReservationId
      otp: $Otp
      awash_bank_account_number: $AwashBankAccountNumber
      step: $step
    ) {
      message
      success
      statusCode
      statusDescription
    }
  }
`;
export const AdminPayWithTelebirr = gql`
  query payWithTelebirr($price: String, $reservationId: String) {
    payWithTelebirr(price: $price, reservationId: $reservationId) {
      message
    }
  }
`;
export const SellerPayWithTelebirr = gql`
  query payWithTelebirr($Price: String, $ReservationId: String) {
    payWithTelebirr(price: $Price, reservationId: $ReservationId) {
      message
      success
      statusCode
      statusDescription
    }
  }
`;
export const Reservation = gql`
  query reservations {
    reservations {
      checkin_time
      checkout_time
      createdAt

      Id
      user {
        firstName
        middleName
        lastName
        phone_no
        fullName
      }
      hotel {
        Id
        name
      }
      room {
        room_no
        floor_no
      }
    }
  }
`;
export const StagedReservation = gql`
  query viewStagedReservations {
    viewStagedReservations {
      Id
      decision
      createdAt
      checkin_time
      checkout_time
      paymentMethod
      user {
        firstName
        middleName
        lastName
        phone_no
        fullName
      }
      hotel {
        Id
        name
      }
      room {
        floor_no
        room_no
      }
    }
  }
`;
export const ViewStagedReservation = gql`
  query sellerViewStagedReservations {
    sellerViewStagedReservations {
      Id
      decision
      createdAt
      checkin_time
      checkout_time
      paymentMethod
      user {
        firstName
        middleName
        lastName
        phone_no
        fullName
      }
      hotel {
        Id
        name
      }
      room {
        floor_no
        room_no
      }
    }
  }
`;
export const ViewBookings = gql`
  query viewBookings {
    viewBookings {
      checkin_time
      checkout_time
      createdAt
      Id
      checkout
      Total_price
      user {
        fullName
      }
      room {
        floor_no
        room_no
        roomType {
          name
        }
      }
      hotel {
        name
      }
    }
  }
`;
export const Booking = gql`
  query bookings {
    bookings {
      checkin_time
      checkout_time
      createdAt
      Id
      checkout
      Total_price
      user {
        fullName
      }
      room {
        floor_no
        room_no
        roomType {
          name
        }
      }
      hotel {
        name
        Id
      }
    }
  }
`;
export const ActiveBooking = gql`
  query activeBookings {
    activeBookings {
      total
    }
  }
`;
export const TotalReservations = gql`
  query totalReservations {
    totalReservations {
      total
    }
  }
`;
export const Checkout = gql`
  mutation checkOut($checkOutBookingId: ID) {
    checkOut(bookingId: $checkOutBookingId) {
      message
    }
  }
`;
export const AdminCheckout = gql`
  mutation adminCheckout($checkOutBookingId: ID) {
    adminCheckout(bookingId: $checkOutBookingId) {
      message
    }
  }
`;
export const ExtendStay = gql`
  mutation extendStay(
    $extendStayBookingId: ID
    $extendStayCheckoutTime: String
  ) {
    extendStay(
      bookingId: $extendStayBookingId
      checkout_time: $extendStayCheckoutTime
    ) {
      message
    }
  }
`;
export const AdminExtendStay = gql`
  mutation adminExtendStay(
    $extendStayBookingId: ID
    $extendStayCheckoutTime: String
  ) {
    adminExtendStay(
      bookingId: $extendStayBookingId
      checkout_time: $extendStayCheckoutTime
    ) {
      message
    }
  }
`;
export const CancelReservation = gql`
  mutation cancelReservation($cancelReservationReservationId: ID) {
    cancelReservation(reservationId: $cancelReservationReservationId) {
      message
    }
  }
`;
export const AdminCancelReservation = gql`
  mutation adminCancelReservation($cancelReservationReservationId: ID) {
    adminCancelReservation(reservationId: $cancelReservationReservationId) {
      message
    }
  }
`;
export const AdminBookUsingPaymentMethods = gql`
  mutation adminBookUsingPaymentMethods($reservationId: ID, $price: Int) {
    adminBookUsingPaymentMethods(reservationId: $reservationId, price: $price) {
      message
    }
  }
`;
export const UserBookUsingPaymentMethods = gql`
  mutation userBookUsingPaymentMethods($reservationId: ID, $price: Int) {
    userBookUsingPaymentMethods(reservationId: $reservationId, price: $price) {
      message
    }
  }
`;
export const AdminBookUsingCash = gql`
  mutation adminBookUsingCash($reservationId: ID, $price: Int) {
    adminBookUsingCash(reservationId: $reservationId, price: $price) {
      message
    }
  }
`;

export const BookUsingPaymentMethods = gql`
  mutation bookUsingPaymentMethods($reservationId: ID, $price: Int) {
    bookUsingPaymentMethods(reservationId: $reservationId, price: $price) {
      message
    }
  }
`;
export const BookUsingCash = gql`
  mutation bookUsingCash($reservationId: ID, $price: Int) {
    bookUsingCash(reservationId: $reservationId, price: $price) {
      message
    }
  }
`;
