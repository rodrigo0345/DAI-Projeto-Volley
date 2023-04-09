package com.example.application.security;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.logging.Level;
import java.util.logging.Logger;

<<<<<<< HEAD


public class CryptWithMD5 {
  private static MessageDigest md;

  public static  String cryptWithMD5(String pass){
  try {
    md = MessageDigest.getInstance("MD5");
    md.update(pass.getBytes());

    byte[] resultByteArray = md.digest();

    StringBuilder sb = new StringBuilder();

    for(byte b : resultByteArray ) {
        sb.append(String.format("%02x", b ));
    }
    return sb.toString();

  } catch (NoSuchAlgorithmException ex) {
  Logger.getLogger(CryptWithMD5.class.getName()).log(Level.SEVERE, null, ex);
  }
  return null;


  }
 }

=======
/*
 * public class CryptWithMD5 {
 * private static MessageDigest md;
 *
 * public static String cryptWithMD5(String pass){
 * try {
 * md = MessageDigest.getInstance("MD5");
 * byte[] passBytes = pass.getBytes();
 * md.reset();
 * byte[] digested = md.digest(passBytes);
 * StringBuffer sb = new StringBuffer();
 * for(int i=0;i<digested.length;i++){
 * sb.append(Integer.toHexString(0xff & digested[i]));
 * }
 * return sb.toString();
 * } catch (NoSuchAlgorithmException ex) {
 * Logger.getLogger(CryptWithMD5.class.getName()).log(Level.SEVERE, null, ex);
 * }
 * return null;
 *
 *
 * }
 * }
 */
>>>>>>> restyled/Signup
