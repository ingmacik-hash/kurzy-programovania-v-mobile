import java.util.Properties

plugins {
    id("com.android.application")
    // The Flutter Gradle Plugin must be applied after the Android and Kotlin Gradle plugins.
    id("dev.flutter.flutter-gradle-plugin")
}

val podpis = Properties().apply {
    val f = rootProject.file("key.properties")
    // SYNTAX_LADIACI_PODPIS=1 → skúšobná verzia do telefónu podpísaná ladiacim kľúčom (dá sa nainštalovať cez staršiu bez straty pokroku).
    if (f.exists() && System.getenv("SYNTAX_LADIACI_PODPIS") == null) f.inputStream().use { load(it) }
}

android {
    namespace = "com.example.kurz_kodu"
    compileSdk = flutter.compileSdkVersion
    ndkVersion = flutter.ndkVersion

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    defaultConfig {
        // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
        applicationId = "com.example.kurz_kodu"
        // You can update the following values to match your application needs.
        // For more information, see: https://flutter.dev/to/review-gradle-config.
        minSdk = flutter.minSdkVersion
        targetSdk = flutter.targetSdkVersion
        // Uses the version code from pubspec.yaml. When using split APKs, 1000 * ABI_VERSION
        // is added automatically by Flutter. (https://developer.android.com/studio/build/configure-apk-splits#configure-APK-versions)
        // You can force using the value of versionCode by specifying the `-P force-version-code-ignoring-abi=true`
        // flag during build.
        versionCode = flutter.versionCode
        versionName = flutter.versionName
    }

    // Podpis vydania: údaje sú v android/key.properties (nie je v gite, kľúč je mimo projektu).
    // Bez key.properties sa vydanie podpíše ladiacim kľúčom (napr. na GitHub Actions).
    signingConfigs {
        create("release") {
            if (podpis.isNotEmpty()) {
                keyAlias = podpis.getProperty("keyAlias")
                keyPassword = podpis.getProperty("keyPassword")
                storeFile = file(podpis.getProperty("storeFile"))
                storePassword = podpis.getProperty("storePassword")
            }
        }
    }

    buildTypes {
        release {
            signingConfig = if (podpis.isNotEmpty()) signingConfigs.getByName("release") else signingConfigs.getByName("debug")
        }
    }
}

kotlin {
    compilerOptions {
        jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
    }
}

flutter {
    source = "../.."
}
