export type Language = "en" | "zh";

type TranslationKey =
  | "navHome"
  | "navAbout"
  | "navServices"
  | "navBooking"
  | "navContact"
  | "langEnglish"
  | "langChinese"
  | "heroBadge"
  | "heroTitle"
  | "heroSubtitle"
  | "heroPrimaryCta"
  | "heroSecondaryCta"
  | "practitionersEyebrow"
  | "practitionersTitle"
  | "practitionersSubtitle"
  | "whyChooseEyebrow"
  | "whyChooseTitle"
  | "whyChooseSubtitle"
  | "servicesTitle"
  | "servicesSubtitle"
  | "contactInfoEyebrow"
  | "contactInfoTitle"
  | "contactInfoSubtitle"
  | "aboutEyebrow"
  | "aboutPageTitle"
  | "aboutPageSubtitle"
  | "aboutMissionTitle"
  | "aboutMissionBody"
  | "servicesPageEyebrow"
  | "servicesPageTitle"
  | "servicesPageSubtitle"
  | "bookingPageEyebrow"
  | "bookingPageTitle"
  | "bookingPageSubtitle"
  | "bookingFormName"
  | "bookingFormPhone"
  | "bookingFormEmail"
  | "bookingFormReason"
  | "bookingFormSubmit"
  | "bookingFormNote"
  | "bookingSubmitSuccess"
  | "bookingSubmitError"
  | "bookingSubmitSending"
  | "contactPageEyebrow"
  | "contactPageTitle"
  | "contactPageSubtitle"
  | "contactCallTitle"
  | "contactEmailTitle"
  | "contactVisitTitle"
  | "contactHoursTitle"
  | "bookingTitle"
  | "bookingDescription"
  | "bookingCta"
  | "footerTagline"
  | "footerCopyright";

type TranslationMap = Record<Language, Record<TranslationKey, string>>;

export const translations: TranslationMap = {
  en: {
    navHome: "Home",
    navAbout: "About Us",
    navServices: "Services",
    navBooking: "Booking",
    navContact: "Contact",
    langEnglish: "EN",
    langChinese: "中文",
    heroBadge: "Family medicine — Markham, Ontario",
    heroTitle: "Primary medical care for adults and families",
    heroSubtitle:
      "Langham Health Centre offers general practice services. Use the form on the Booking page to request an appointment; our office will contact you to confirm.",
    heroPrimaryCta: "Request an appointment",
    heroSecondaryCta: "Clinical services",
    practitionersEyebrow: "Our Team",
    practitionersTitle: "Meet your practitioners",
    practitionersSubtitle:
      "General practice physicians and nursing staff. Credentials and hospital affiliations are available on request at reception.",
    whyChooseEyebrow: "Why Choose Us",
    whyChooseTitle: "Practice standards",
    whyChooseSubtitle:
      "We follow established clinical guidelines and maintain clear communication with patients in English and Chinese where available.",
    servicesTitle: "Services",
    servicesSubtitle:
      "Summary of common services. Not all services may be available at every visit; eligibility is assessed at appointment.",
    contactInfoEyebrow: "Get in Touch",
    contactInfoTitle: "Contact information",
    contactInfoSubtitle:
      "Reach us by phone or email, or visit our clinic for in-person support.",
    aboutEyebrow: "About Langham Health Centre",
    aboutPageTitle: "Community-based family practice",
    aboutPageSubtitle:
      "Langham Health Centre is a primary care clinic serving patients in Markham and surrounding areas.",
    aboutMissionTitle: "Our Mission",
    aboutMissionBody:
      "To provide evidence-informed primary care in a professional setting, with respect for patient confidentiality and cultural needs.",
    servicesPageEyebrow: "Clinical Services",
    servicesPageTitle: "Clinical services",
    servicesPageSubtitle:
      "The following list is for general information. Assessment, diagnosis, and treatment are provided only during a clinical encounter.",
    bookingPageEyebrow: "Appointments",
    bookingPageTitle: "Book your visit",
    bookingPageSubtitle:
      "Submit the form below. This is a request only; it does not guarantee an appointment until confirmed by the clinic.",
    bookingFormName: "Full name",
    bookingFormPhone: "Phone number",
    bookingFormEmail: "Email address",
    bookingFormReason: "Reason for visit",
    bookingFormSubmit: "Submit request",
    bookingFormNote:
      "For urgent or emergency symptoms, call 911 or go to the nearest emergency department. For same-day clinic matters, telephone the office.",
    bookingSubmitSuccess:
      "Your request has been sent. If you do not hear from us within two business days, please telephone the clinic.",
    bookingSubmitError: "The request could not be sent. Please telephone or email the clinic.",
    bookingSubmitSending: "Sending…",
    contactPageEyebrow: "Contact",
    contactPageTitle: "We are here to help",
    contactPageSubtitle:
      "Contact our reception team for appointments, clinic information, and patient support.",
    contactCallTitle: "Call Us",
    contactEmailTitle: "Email",
    contactVisitTitle: "Visit",
    contactHoursTitle: "Opening Hours",
    bookingTitle: "Appointment requests",
    bookingDescription:
      "Submit a request online through the Booking page, or contact reception by telephone during office hours.",
    bookingCta: "Booking",
    footerTagline: "Primary care services. By appointment.",
    footerCopyright: "All rights reserved.",
  },
  zh: {
    navHome: "主页",
    navAbout: "关于我们",
    navServices: "服务项目",
    navBooking: "预约",
    navContact: "联系我们",
    langEnglish: "EN",
    langChinese: "中文",
    heroBadge: "全科医疗 — 安大略省万锦市",
    heroTitle: "为成人与家庭提供基层医疗服务",
    heroSubtitle:
      "Langham Health Centre 提供全科门诊服务。请在预约页面提交申请，诊所以电话或邮件与您确认时间。",
    heroPrimaryCta: "提交预约申请",
    heroSecondaryCta: "医疗服务",
    practitionersEyebrow: "医疗团队",
    practitionersTitle: "认识我们的执业团队",
    practitionersSubtitle:
      "执业医师及护理人员信息可至前台查阅；必要时可向诊所索取相关资质说明。",
    whyChooseEyebrow: "为何选择我们",
    whyChooseTitle: "诊疗与沟通",
    whyChooseSubtitle: "临床工作遵循规范路径；在条件允许情况下提供中英文沟通支持。",
    servicesTitle: "服务项目",
    servicesSubtitle: "以下为常见服务概述；具体是否适用须在就诊时由医生评估。",
    contactInfoEyebrow: "联系信息",
    contactInfoTitle: "与我们联系",
    contactInfoSubtitle: "欢迎通过电话、邮件或到诊所前台与我们联系。",
    aboutEyebrow: "关于 Langham Health Centre",
    aboutPageTitle: "社区基层医疗诊所",
    aboutPageSubtitle: "Langham Health Centre 为万锦市及周边居民提供基层医疗服务。",
    aboutMissionTitle: "我们的使命",
    aboutMissionBody:
      "在专业机构环境中提供循证基层医疗，尊重患者隐私与文化需求。",
    servicesPageEyebrow: "医疗服务",
    servicesPageTitle: "医疗服务",
    servicesPageSubtitle: "以下信息仅供一般说明；诊断与治疗须在实际就诊中完成。",
    bookingPageEyebrow: "预约就诊",
    bookingPageTitle: "提交预约申请",
    bookingPageSubtitle:
      "提交表格仅为预约申请，不代表已确认就诊时间，诊所未联系确认前请勿视为预约成功。",
    bookingFormName: "姓名",
    bookingFormPhone: "联系电话",
    bookingFormEmail: "邮箱",
    bookingFormReason: "就诊原因",
    bookingFormSubmit: "提交申请",
    bookingFormNote:
      "如遇紧急或危重症状，请拨打911或前往最近急诊科。如需当日门诊协助，请致电诊所前台。",
    bookingSubmitSuccess:
      "申请已发送。如在两个工作日内未收到回复，请直接致电诊所。",
    bookingSubmitError: "发送失败，请致电或通过电子邮件联系诊所。",
    bookingSubmitSending: "发送中…",
    contactPageEyebrow: "联系我们",
    contactPageTitle: "我们随时为您服务",
    contactPageSubtitle: "如需预约、门诊信息或患者支持，请联系前台团队。",
    contactCallTitle: "电话",
    contactEmailTitle: "邮箱",
    contactVisitTitle: "地址",
    contactHoursTitle: "营业时间",
    bookingTitle: "预约申请",
    bookingDescription: "请使用预约页面提交申请，或在营业时间内致电前台。",
    bookingCta: "预约",
    footerTagline: "基层医疗服务。须预约就诊。",
    footerCopyright: "版权所有。",
  },
};

export function t(language: Language, key: TranslationKey): string {
  return translations[language][key];
}
