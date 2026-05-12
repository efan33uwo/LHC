import type { Language } from "@/lib/translations";

export type ServiceItem = {
  title: string;
  description: string;
  icon: string;
};

export type PractitionerItem = {
  name: string;
  role: string;
  bio: string;
};

export type TrustCard = {
  title: string;
  description: string;
};

type Localized<T> = Record<Language, T>;

export const clinicContent = {
  name: "Langham Health Center",
  phone: "905-477-7887",
  email: "erikfan765@gmail.com",
  address: "8333 Kennedy Rd Unit 2000, Markham, ON",
  hours: "Mon-Sun 10:00am - 6:00pm",
  mapLink: "https://maps.google.com/?q=8333+Kennedy+Rd+Unit+2000+Markham+ON",
  mapEmbedLink:
    "https://www.google.com/maps?output=embed&q=8333+Kennedy+Rd+Unit+2000,+Markham,+ON",

  aboutHighlights: {
    en: [
      "Family medicine and chiropractic care in one clinic setting",
      "Bilingual support for English and Chinese-speaking patients",
      "Convenient appointment requests and patient-focused follow-up",
    ],
    zh: [
      "家庭医疗与脊椎治疗服务结合于同一门诊环境",
      "为英语及中文患者提供双语沟通支持",
      "提供便捷预约及以患者为中心的后续跟进服务",
    ],
  } as Localized<string[]>,

  services: {
    en: [
      {
        title: "Family Medicine",
        description:
          "Primary care appointments for routine concerns, ongoing care, general medical assessment, and follow-up.",
        icon: "FM",
      },
      {
        title: "Chiropractic Care",
        description:
          "Assessment and treatment for back pain, neck pain, joint discomfort, posture-related strain, and musculoskeletal concerns.",
        icon: "DC",
      },
      {
        title: "Acupuncture",
        description:
          "Supportive treatment for pain management, tension, recovery, and overall wellness as part of a broader care plan.",
        icon: "AC",
      },
      {
        title: "Preventive Health",
        description:
          "Routine health checks, screening support, and preventive care to help patients stay on top of their health.",
        icon: "PH",
      },
      {
        title: "Chronic Condition Management",
        description:
          "Ongoing follow-up for conditions such as diabetes, hypertension, asthma, and other long-term health needs.",
        icon: "CC",
      },
      {
        title: "Women's Health",
        description:
          "Routine care, preventive support, and general health consultations tailored to women’s health needs.",
        icon: "WH",
      },
    ],
    zh: [
      {
        title: "家庭医疗",
        description:
          "提供常规门诊、持续性基层医疗、一般健康评估及复诊服务。",
        icon: "家医",
      },
      {
        title: "脊椎治疗",
        description:
          "针对背痛、颈痛、关节不适、姿势压力及肌肉骨骼问题进行评估与治疗。",
        icon: "脊疗",
      },
      {
        title: "针灸治疗",
        description:
          "作为综合治疗计划的一部分，为疼痛管理、紧张缓解、恢复及整体健康提供辅助支持。",
        icon: "针灸",
      },
      {
        title: "预防保健",
        description:
          "提供常规健康检查、筛查支持及预防性照护，帮助患者更好地管理自身健康。",
        icon: "预防",
      },
      {
        title: "慢病管理",
        description:
          "针对糖尿病、高血压、哮喘及其他长期健康问题提供持续随访与支持。",
        icon: "慢病",
      },
      {
        title: "女性健康",
        description:
          "提供女性常规照护、预防支持及一般健康咨询服务。",
        icon: "女性",
      },
    ],
  } as Localized<ServiceItem[]>,

  practitioners: {
    en: [
      {
        name: "Family Doctor Team",
        role: "Primary Care",
        bio: "Our family medicine team supports routine medical care, preventive health, follow-up, and continuity of care for patients and families.",
      },
      {
        name: "Chiropractic Team",
        role: "Musculoskeletal Care",
        bio: "Our chiropractic services focus on assessment and treatment of pain, mobility concerns, posture-related issues, and physical strain.",
      },
      {
        name: "Clinic Support Team",
        role: "Patient Coordination",
        bio: "Our clinic support staff help patients with scheduling, communication, and a smooth front-desk experience from booking to follow-up.",
      },
    ],
    zh: [
      {
        name: "家庭医生团队",
        role: "基层医疗",
        bio: "家庭医疗团队为患者及家庭提供常规门诊、预防保健、复诊及持续性照护服务。",
      },
      {
        name: "脊椎治疗团队",
        role: "肌肉骨骼照护",
        bio: "脊椎治疗服务专注于疼痛、活动度问题、姿势压力及身体劳损相关问题的评估与处理。",
      },
      {
        name: "门诊支持团队",
        role: "患者协调",
        bio: "门诊支持人员协助患者处理预约、沟通及从登记到后续跟进的整体前台体验。",
      },
    ],
  } as Localized<PractitionerItem[]>,

  whyChooseUs: {
    en: [
      {
        title: "Integrated Clinic Experience",
        description:
          "Patients benefit from a clinic environment that supports both family medicine and chiropractic care in one accessible setting.",
      },
      {
        title: "Bilingual Communication",
        description:
          "English-speaking care is standard, and Chinese language support is available to help patients feel informed and comfortable.",
      },
      {
        title: "Professional Scheduling and Follow-Up",
        description:
          "Appointment requests, front-desk communication, and follow-up processes are designed to be clear, simple, and patient-focused.",
      },
      {
        title: "Comfort and Accessibility",
        description:
          "We aim to provide a clean, welcoming, and professionally managed environment for individuals and families seeking care.",
      },
    ],
    zh: [
      {
        title: "综合门诊体验",
        description:
          "患者可在同一门诊环境中获得家庭医疗与脊椎治疗相关服务，体验更便捷的一体化照护。",
      },
      {
        title: "双语沟通支持",
        description:
          "门诊以英语服务为基础，并提供中文沟通支持，帮助患者更安心、更清楚地了解治疗流程。",
      },
      {
        title: "专业预约与后续跟进",
        description:
          "预约申请、前台沟通及后续联系流程力求清晰、简洁，并以患者体验为核心。",
      },
      {
        title: "舒适与便利",
        description:
          "我们致力于提供整洁、欢迎且专业管理的门诊环境，服务个人及家庭患者。",
      },
    ],
  } as Localized<TrustCard[]>,
};