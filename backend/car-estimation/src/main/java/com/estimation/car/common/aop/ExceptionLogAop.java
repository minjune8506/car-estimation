package com.estimation.car.common.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;


@Slf4j
@Aspect
@Component
public class ExceptionLogAop {

    @Pointcut(value = "execution(* com.estimation.car.common.exception.GlobalControllerAdvice..*(..))")
    private void cut() {
    }

    @Before("cut()")
    public void beforeControllerAdviceLog(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        for (Object arg : args) {
            Exception exception = (Exception) arg;
            log.error(exception.getMessage());
        }
    }
}
