package com.nativemodule.customnativemodule

import android.widget.Toast
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ToastModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ToastModule"
    }

    @ReactMethod
    fun showToast(message: String) {
        Toast.makeText(reactContext, message, Toast.LENGTH_SHORT).show()
    }

    @ReactMethod
    fun getDeviceName(promise: Promise) {
        try {
            val deviceName = android.os.Build.MODEL
            promise.resolve(deviceName)
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }
}
